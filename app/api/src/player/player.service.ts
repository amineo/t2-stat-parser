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
			gameDetails
		};

		return formattedStats;
	}
}
