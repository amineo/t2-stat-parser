import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Players } from './entities/Players';
import { GameDetail } from '../game/entities/GameDetail';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { TopPlayersQueryDto } from '../common/dto/top-players-query.dto';

@Injectable()
export class PlayersService {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		@InjectRepository(Players) private readonly playersRepository: Repository<Players>,
		@InjectRepository(GameDetail) private readonly gameRepository: Repository<GameDetail>
	) {}

	async findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;

		const returnMaxLimit = Math.min(500, Math.max(0, limit));

		const players = await this.playersRepository.find({
			skip: offset,
			take: returnMaxLimit,
			order: {
				updatedAt: 'DESC'
			}
		});

		return players;
	}

	async findOne(playerGuid: string) {
		const player = await this.playersRepository.findOne({
			relations: [ 'gameDetails' ],
			where: [ { playerGuid: playerGuid } ]
		});
		if (!player) {
			throw new NotFoundException(`Player GUID: ${playerGuid} not found`);
		}
		return player;
	}

	async findTop(topPlayersQuery: TopPlayersQueryDto) {
		const { stat: hitsStat, gameType, minGames, minShots, limit } = topPlayersQuery;

		const shotsStat = {
			discDmgHitsTG: 'discShotsFiredTG',
			discHitsTG: 'discShotsFiredTG',
			discMATG: 'discShotsFiredTG',
			laserHitsTG: 'laserShotsFiredTG',
			laserMATG: 'laserShotsFiredTG',
			cgHitsTG: 'cgShotsFiredTG',
			shockHitsTG: 'shockShotsFiredTG'
		}[hitsStat]

		// Possibly make this a query param at some point?
		const excludeDiscJumps = shotsStat === 'discShotsFiredTG';

		const hitsValue = '(game.stats->:hitsStat->>0)::integer';
		const shotsValue = '(game.stats->:shotsStat->>0)::integer';
		const discJumpsValue = "(game.stats->'discJumpTG'->>0)::integer";
		const killerDiscJumpsValue = "(game.stats->'killerDiscJumpTG'->>0)::integer";

		// pgSQL doesn't let you reference aliased selections you've made in the
		// same select statement, so unfortunately these computed JSON values are
		// repeated in a couple places. Using template strings here to easily repeat
		// the same expression instead of having multiple nested subqueries. Rest
		// assured, no user-supplied values are ever interpolated, those are all
		// parameterized instead.
		const aggregatedHits = `SUM(${hitsValue})::integer`;
		// Add sums of `discJumpTG` and `killerDiscJumpTG`.
		const aggregatedDiscJumps =
			`(SUM(${discJumpsValue})::integer + SUM(${killerDiscJumpsValue})::integer)`;

		let aggregatedShots = `SUM(${shotsValue})::integer`;
		if (excludeDiscJumps) {
			// Since subtracting disc jumps could theoretically drop the shots count
			// to 0, clamp it to at least the number of hits, otherwise it'd be
			// possible to have >100% accuracy.
			aggregatedShots = `GREATEST(${aggregatedHits}, ${aggregatedShots} - ${aggregatedDiscJumps})`
		}

		// Cast to float to avoid integer division truncating the result.
		const aggregatedAccuracy = `(${aggregatedHits}::float / ${aggregatedShots}::float)`;

		// TODO: This whole query could probably be turned into a `ViewEntity` at
		// some point, but I couldn't get that to work.

		let playersQuery = this.playersRepository.createQueryBuilder('player')
			.setParameters({
				hitsStat,
				shotsStat,
				minGames,
				minShots,
			})
			.select([
				'player.player_guid',
				'player.player_name',
				'stats.game_count',
				'stats.hits',
				'stats.shots',
				'stats.accuracy'
			])
			.innerJoin(subQuery => {
				let statsQuery = subQuery
					.select(['game.player_guid'])
					.from(GameDetail, 'game')
					.addSelect('COUNT(game.id)::integer', 'game_count')
					.addSelect(aggregatedHits, 'hits')
					.addSelect(aggregatedShots, 'shots')
					.addSelect(aggregatedAccuracy, 'accuracy')
					.where(`${shotsValue} > 0`)
					.groupBy('game.player_guid');

				if (excludeDiscJumps) {
					statsQuery = statsQuery.addSelect(aggregatedDiscJumps, 'disc_jumps');
				}

				if (gameType) {
					statsQuery = statsQuery.andWhere('game.gametype = :gameType', { gameType })
				}

				return statsQuery;
			}, 'stats', 'stats.player_guid = player.player_guid')
			.where('stats.game_count >= :minGames')
			.andWhere('stats.shots >= :minShots')
			.orderBy('stats.accuracy', 'DESC')
			.limit(limit);

		if (excludeDiscJumps) {
			playersQuery = playersQuery.addSelect('stats.disc_jumps');
		}

		// Uncomment to debug:
		// console.log(query.getQueryAndParameters());

		// typeorm doesn't let you select computed columns since they're not part
		// of the entity definition. There are workarounds, but I'm not a fan of any
		// and would rather use `getRawMany()` for now, which does include them.
		// See: https://github.com/typeorm/typeorm/issues/296
		const rows = await playersQuery.getRawMany();

		// `getRawMany` was used, so manually snake_case -> camelCase.
		const players = rows.map(row => ({
			playerGuid: row.player_guid,
			playerName: row.player_name,
			gameCount: row.game_count,
			hits: row.hits,
			shots: row.shots,
			discJumps: row.disc_jumps,
			accuracy: row.accuracy
		}));

		return {
			// Even though some of these parameters might have been supplied as input,
			// it's still useful to know what values were actually used, in case
			// defaults were used instead, values were clamped to min/max, etc.
			hitsStat,
			shotsStat,
			excludeDiscJumps,
			minGames,
			minShots,
			limit,
			players
		};
	}
}
