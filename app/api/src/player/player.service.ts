import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Players } from '../players/entities/Players';
import { GameDetail } from '../game/entities/GameDetail';

import formatPlayerStats from '../common/util/formatStats';

@Injectable()
export class PlayerService {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		@InjectRepository(Players) private readonly playersRepository: Repository<Players>,
		@InjectRepository(GameDetail) private readonly gameRepository: Repository<GameDetail>
	) {}

	async findOne(playerGuid: string) {
		const player = await this.playersRepository.findOne({
			relations: [ 'gameDetails' ],
			where: [ { playerGuid: playerGuid } ]
		});

		if (!player) {
			throw new NotFoundException(`Player GUID: ${playerGuid} not found`);
		}

		const gameDetails = [];

		for (const game in player.gameDetails) {
			const g = player.gameDetails[game];

			const stats = formatPlayerStats(g);

			gameDetails.push({ ...g, stats });
		}

		/* stat sum */
		// Dynamically generate and sum the statTotals object
		// This is dirty and should be cleaned up but will do for now :)
		const playerStatTotals = {},
			statKeys = Object.keys(gameDetails[0].stats);

		for (let i = 0; i < statKeys.length; i++) {
			if (
				statKeys[i] === 'map' ||
				statKeys[i] === 'dateStamp' ||
				statKeys[i] === 'timeDayMonth' ||
				statKeys[i] === 'gameID' ||
				statKeys[i] === 'mapID'
			) {
				continue;
			}
			playerStatTotals[statKeys[i]] = 0;
		}

		gameDetails.map((statLine) => {
			// look through each object in playerStatsData array
			for (const [ key, value ] of Object.entries(statLine.stats)) {
				//  console.log(`${key}: ${value}`);
				// If the stat item exists, add it -- if not create a new key in playerStatTotals
				if (playerStatTotals.hasOwnProperty(key) === true) {
					playerStatTotals[key] = playerStatTotals[key] + Number(value);
				} else {
					playerStatTotals[key] = Number(value);
				}
			}
		});
		/* end stat sum */

		const formattedStats = {
			...player,
			totalGamesCtfgame: Number(player.totalGamesCtfgame),
			totalGamesDmgame: Number(player.totalGamesDmgame),
			totalGamesSctfgame: Number(player.totalGamesSctfgame),
			totalGamesLakrabbitgame: Number(player.totalGamesLakrabbitgame),
			totalGames:
				Number(player.totalGamesCtfgame) +
				Number(player.totalGamesDmgame) +
				Number(player.totalGamesSctfgame) +
				Number(player.totalGamesLakrabbitgame),
			gameDetails: gameDetails
				.filter((g) => g.stats.scoreTG > 0)
				.sort((a, b) => Number(b.stats.gameID) - Number(a.stats.gameID)),
			statTotals: playerStatTotals
		};

		return formattedStats;
	}
}
