import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Games } from '../games/entities/Games';
import { GameDetail } from './entities/GameDetail';

@Injectable()
export class GameService {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		@InjectRepository(Games) private readonly gamesRepository: Repository<Games>,
		@InjectRepository(GameDetail) private readonly gameRepository: Repository<GameDetail>
	) {}

	async findOne(gameId: string) {
		const query = await this.gameRepository.find({
			relations: [ 'game', 'playerGuid' ],
			where: [ { game: { gameId: gameId } } ]
		});

		if (!query.length) {
			throw new NotFoundException(`Game ID: ${gameId} not found`);
		}

		const game: any = {
			...query[0].game
		};

		// Need to set return based off gameType
		// Modify game object if not a CTF type game and return early
		if (query[0].gametype !== 'CTFGame' && query[0].gametype !== 'SCtFGame') {
			game['players'] = [];
			for (const player of query) {
				const { playerName, stats } = player;

				const p = {
					playerGuid: player.playerGuid.playerGuid,
					playerName,
					stats
				};

				game.players.push(p);
			}

			return game;
		}

		// Team Based game stats  (CTF/SCtF)
		game['teams'] = {
			obs: { score: 0, players: [] },
			storm: { score: 0, players: [] },
			inferno: { score: 0, players: [] }
		};

		for (const player of query) {
			const { playerName, stats } = player;

			const p = {
				playerGuid: player.playerGuid.playerGuid,
				playerName,
				stats
			};

			const flagGrabsTG = parseInt(player.stats.flagGrabsTG[0]);
			const flagCapsTG = parseInt(player.stats.flagCapsTG[0]) * 100;
			const totalFlagScore = flagGrabsTG + flagCapsTG;

			if (player.stats.dtTeamGame[0] === '1') {
				// Storm
				game.teams.storm.score += totalFlagScore;
				game.teams.storm.players.push(p);
			} else if (player.stats.dtTeamGame[0] === '2') {
				// Inferno
				game.teams.inferno.score += totalFlagScore;
				game.teams.inferno.players.push(p);
			} else {
				// OBS
				game.teams.obs.score += totalFlagScore;
				game.teams.obs.players.push(p);
			}
		}

		//const teamZero: any = game; //game.find(({ stats }) => stats.dtTeamGame[0] === '3');

		// const teamOne: any = game.find(({ stats }) => stats.dtTeamGame[0] === '1');
		// const teamTwo: any = game.find(({ stats }) => stats.dtTeamGame[0] === '2');

		return game;
	}
}
