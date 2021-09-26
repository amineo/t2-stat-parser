import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Players } from './entities/Players';
import { GameDetail } from '../game/entities/GameDetail';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import {
	TopAccuracyQueryDto,
	TopWinsQueryDto,
} from '../common/dto/top-players-query.dto';

@Injectable()
export class PlayersService {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		@InjectRepository(Players)
		private readonly playersRepository: Repository<Players>,
		@InjectRepository(GameDetail)
		private readonly gameRepository: Repository<GameDetail>,
	) {}

	async findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;

		const returnMaxLimit = Math.min(500, Math.max(0, limit));

		const players = await this.playersRepository.find({
			skip: offset,
			take: returnMaxLimit,
			order: {
				updatedAt: 'DESC',
			},
		});

		return players;
	}

	async findOne(playerGuid: string) {
		const player = await this.playersRepository.findOne({
			relations: ['gameDetails'],
			where: [{ playerGuid: playerGuid }],
		});
		if (!player) {
			throw new NotFoundException(`Player GUID: ${playerGuid} not found`);
		}
		return player;
	}

	async findTopAccuracy(topAccuracyQuery: TopAccuracyQueryDto) {
		const {
			stat: hitsStat,
			gameType,
			minGames,
			minShots,
			limit,
			timePeriod,
		} = topAccuracyQuery;

		const shotsStat = {
			discDmgHitsTG: 'discShotsFiredTG',
			discHitsTG: 'discShotsFiredTG',
			discMATG: 'discShotsFiredTG',
			laserHitsTG: 'laserShotsFiredTG',
			laserMATG: 'laserShotsFiredTG',
			cgHitsTG: 'cgShotsFiredTG',
			shockHitsTG: 'shockShotsFiredTG',
			grenadeDmgHitsTG: 'grenadeShotsFiredTG',
			grenadeHitsTG: 'grenadeShotsFiredTG',
			grenadeMATG: 'grenadeShotsFiredTG',
		}[hitsStat];

		// Possibly make this a query param at some point?
		const excludeDiscJumps = shotsStat === 'discShotsFiredTG';

		const hitsValue = '(game.stats->:hitsStat->>0)::integer';
		const shotsValue = '(game.stats->:shotsStat->>0)::integer';
		const discJumpsValue =
			"COALESCE((game.stats->'discJumpTG'->>0)::integer, 0)";
		const killerDiscJumpsValue =
			"COALESCE((game.stats->'killerDiscJumpTG'->>0)::integer, 0)";

		// pgSQL doesn't let you reference aliased selections you've made in the
		// same select statement, so unfortunately these computed JSON values are
		// repeated in a couple places. Using template strings here to easily repeat
		// the same expression instead of having multiple nested subqueries. Rest
		// assured, no user-supplied values are ever interpolated, those are all
		// parameterized instead.
		const aggregatedHits = `SUM(${hitsValue})::integer`;
		// Add sums of `discJumpTG` and `killerDiscJumpTG`.
		const aggregatedDiscJumps = `(SUM(${discJumpsValue})::integer + SUM(${killerDiscJumpsValue})::integer)`;

		let aggregatedShots = `SUM(${shotsValue})::integer`;
		if (excludeDiscJumps) {
			// Since subtracting disc jumps could theoretically drop the shots count
			// to 0, clamp it to at least the number of hits or 1, otherwise it'd be
			// possible to divide by zero.
			aggregatedShots = `GREATEST(1, ${aggregatedHits}, ${aggregatedShots} - ${aggregatedDiscJumps})`;
		}

		// Cast to float to avoid integer division truncating the result.
		const aggregatedAccuracy = `(${aggregatedHits}::float / ${aggregatedShots}::float)`;

		const sinceDate = '(now() - interval :timePeriod)';

		// TODO: This whole query could probably be turned into a `ViewEntity` at
		// some point, but I couldn't get that to work.

		let playersQuery = this.playersRepository
			.createQueryBuilder('player')
			.setParameters({
				hitsStat,
				shotsStat,
				minGames,
				minShots,
				timePeriod,
			})
			.select([
				'player.player_guid',
				'player.player_name',
				'stats.game_count',
				'stats.hits',
				'stats.shots',
				'stats.accuracy',
			])
			.addSelect(
				timePeriod ? sinceDate : 'NULL',
				'since_date'
			)
			.innerJoin(
				(subQuery) => {
					let statsQuery = subQuery
						.select(['game.player_guid'])
						.from(GameDetail, 'game')
						.addSelect('COUNT(game.id)::integer', 'game_count')
						.addSelect(aggregatedHits, 'hits')
						.addSelect(aggregatedShots, 'shots')
						.addSelect(aggregatedAccuracy, 'accuracy')
						.where(`${shotsValue} > 0`)
						.andWhere(timePeriod ? `game.datestamp >= ${sinceDate}` : 'TRUE')
						.groupBy('game.player_guid');

					if (excludeDiscJumps) {
						statsQuery = statsQuery.addSelect(
							aggregatedDiscJumps,
							'disc_jumps',
						);
					}

					if (gameType) {
						statsQuery = statsQuery.andWhere('game.gametype = :gameType', {
							gameType,
						});
					}

					return statsQuery;
				},
				'stats',
				'stats.player_guid = player.player_guid',
			)
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
		const players = rows.map((row) => ({
			playerGuid: row.player_guid,
			playerName: row.player_name,
			gameCount: row.game_count,
			hits: row.hits,
			shots: row.shots,
			discJumps: row.disc_jumps,
			accuracy: row.accuracy,
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
			timePeriod,
			sinceDate: rows.length ? rows[0].since_date : null,
			players,
		};
	}

	async findTopWins(topWinsQuery: TopWinsQueryDto) {
		const { minGames, limit, timePeriod } = topWinsQuery;

		const sinceDate = '(now() - interval :timePeriod)';

		const query = this.playersRepository
			.createQueryBuilder('player')
			.setParameters({ minGames, timePeriod })
			.select(['stats.player_name', 'stats.player_guid'])
			.addSelect('COUNT(stats.game_id)::integer', 'game_count')
			.addSelect(
				"COUNT(stats.player_match_result = 'win' OR NULL)::integer",
				'win_count',
			)
			.addSelect(
				"COUNT(stats.player_match_result = 'loss' OR NULL)::integer",
				'loss_count',
			)
			.addSelect(
				"COUNT(stats.player_match_result = 'draw' OR NULL)::integer",
				'draw_count',
			)
			.addSelect(
				"(COUNT(stats.player_match_result = 'win' OR NULL)::float + COUNT(stats.player_match_result = 'draw' OR NULL)::float / 2.0) / COUNT(stats.game_id)::float",
				'win_percent',
			)
			.addSelect(
				timePeriod ? sinceDate : 'NULL',
				'since_date'
			)
			.innerJoin(
				(qb) => {
					return (
						qb
							.select([
								'game.player_name',
								'game.player_guid',
								'game.map',
								'game.datestamp',
								'join_g.*',
							])
							// Determine whether they spent at least 67% of the total match time on
							// one team, and then determine whether that means they won or lost.
							// Note that this team may be different from `dtTeamGame`.
							.addSelect(
								`CASE
					WHEN
						((game.stats->'timeOnTeamOneTG'->>0)::float / (game.stats->'matchRunTimeTG'->>0)::float) >= 0.67
					THEN CASE
						WHEN
							join_g.score_storm > join_g.score_inferno
						THEN 'win'
						WHEN
							join_g.score_storm < join_g.score_inferno
						THEN 'loss'
						WHEN
							join_g.score_storm = join_g.score_inferno
						THEN 'draw'
						END
					WHEN
						((game.stats->'timeOnTeamTwoTG'->>0)::float / (game.stats->'matchRunTimeTG'->>0)::float) >= 0.67
					THEN CASE
						WHEN
							join_g.score_inferno > join_g.score_storm
						THEN 'win'
						WHEN
							join_g.score_inferno < join_g.score_storm
						THEN 'loss'
						WHEN
							join_g.score_inferno = join_g.score_storm
						THEN 'draw'
						END
					ELSE 'none'
					END`.replace(/\s+/g, ' '),
								'player_match_result',
							)
							.from(GameDetail, 'game')
							.innerJoin(
								(qb) => {
									return (
										qb
											.select(['g.game_id'])
											.addSelect(
												"COUNT(CASE WHEN (g.stats->'dtTeamGame'->>0)::integer = 1 AND (g.stats->'timeOnTeamOneTG'->>0)::float > 0 THEN 1 ELSE NULL END)::integer",
												'team_size_storm',
											)
											.addSelect(
												"COUNT(CASE WHEN (g.stats->'dtTeamGame'->>0)::integer = 2 AND (g.stats->'timeOnTeamTwoTG'->>0)::float > 0 THEN 1 ELSE NULL END)::integer",
												'team_size_inferno',
											)
											// `teamScoreGame` can get screwed up: players on one team
											// can be assigned the score from the other team (most
											// likely due to team switching). So to determine each
											// team's score, we take the most common `teamScoreGame`
											// from all players on that team who don't have a `timeOnTeam`
											// value of 0.
											.addSelect(
												"(mode() WITHIN GROUP (ORDER BY CASE WHEN ((g.stats->'dtTeamGame'->>0)::integer = 1 AND (g.stats->'timeOnTeamOneTG'->>0)::float > 0) THEN (g.stats->'teamScoreGame'->>0)::integer ELSE NULL END)) / 100",
												'score_storm',
											)
											.addSelect(
												"(mode() WITHIN GROUP (ORDER BY CASE WHEN ((g.stats->'dtTeamGame'->>0)::integer = 2 AND (g.stats->'timeOnTeamTwoTG'->>0)::float > 0) THEN (g.stats->'teamScoreGame'->>0)::integer ELSE NULL END)) / 100",
												'score_inferno',
											)
											.from(GameDetail, 'g')
											.groupBy('g.game_id')
									);
								},
								'join_g',
								'join_g.game_id = game.game_id',
							)
							.where("(game.gametype = 'CTFGame' OR game.gametype = 'SCtFGame')")
							// Only count if the player's `gamePCT` was at least 67%. This is
							// effectively how much of the match they were present for.
							.andWhere("(game.stats->'gamePCT'->>0)::float >= 67")
							// As an extra precaution against prematurely ended matches, only count
							// games that lasted at least 10 minutes.
							.andWhere("(game.stats->'matchRunTimeTG'->>0)::float >= 10")
							// Each team must have at least 2 players.
							.andWhere('join_g.team_size_storm >= 2')
							.andWhere('join_g.team_size_inferno >= 2')
							// Must fall within the specified time period.
							.andWhere(timePeriod ? `game.datestamp >= ${sinceDate}` : 'TRUE')
					);
				},
				'stats',
				'stats.player_guid = player.player_guid',
			)
			.where("stats.player_match_result != 'none'")
			.having('COUNT(stats.game_id)::integer >= :minGames')
			.groupBy('stats.player_guid')
			.addGroupBy('stats.player_name')
			.orderBy(
				"(COUNT(stats.player_match_result = 'win' OR NULL)::float + COUNT(stats.player_match_result = 'draw' OR NULL)::float / 2.0) / COUNT(stats.game_id)::float",
				'DESC',
			)
			.limit(limit);

		// Uncomment to debug:
		// console.log(query.getQueryAndParameters());

		// typeorm doesn't let you select computed columns since they're not part
		// of the entity definition. There are workarounds, but I'm not a fan of any
		// and would rather use `getRawMany()` for now, which does include them.
		// See: https://github.com/typeorm/typeorm/issues/296
		const rows = await query.getRawMany();

		// `getRawMany` was used, so manually snake_case -> camelCase.
		const players = rows.map((row) => ({
			playerGuid: row.player_guid,
			playerName: row.player_name,
			gameCount: row.game_count,
			winCount: row.win_count,
			lossCount: row.loss_count,
			drawCount: row.draw_count,
			winPercent: row.win_percent,
		}));

		return {
			// Even though some of these parameters might have been supplied as input,
			// it's still useful to know what values were actually used, in case
			// defaults were used instead, values were clamped to min/max, etc.
			minGames,
			gameType: ['CTFGame', 'SCtFGame'],
			limit,
			timePeriod,
			sinceDate: rows.length ? rows[0].since_date : null,
			players,
		};
	}
}
