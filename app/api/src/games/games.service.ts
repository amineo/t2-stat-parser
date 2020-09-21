import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Games } from './entities/Games';
import { GameService } from '../game/game.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class GamesService {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		private readonly gameService: GameService,
		@InjectRepository(Games) private readonly gamesRepository: Repository<Games>
	) {}

	async findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;
		const returnMaxLimit = Math.min(300, Math.max(0, limit));

		const games = await this.gamesRepository.find({
			skip: offset,
			take: returnMaxLimit,
			order: {
				gameId: 'DESC'
			}
		});

		return games;
	}

	async findAllWithSummary(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;

		const returnMaxLimit = Math.min(100, Math.max(0, limit));

		const games = await this.gamesRepository.find({
			skip: offset,
			take: returnMaxLimit,
			order: {
				gameId: 'DESC'
			}
		});

		const withSummary = [];
		for (const game of games) {
			const summary = await this.gameService.findOne(game.gameId);
			withSummary.push(summary);
		}

		//  Game findOne service needs to bubble up the game details as parent object and set players below it

		return withSummary;
	}

	async findByType(gametype: string) {
		const game = await this.gamesRepository.find({
			where: { gametype: gametype },
			skip: 0,
			take: 10,
			order: {
				gameId: 'DESC'
			}
		});
		if (!game.length) {
			throw new NotFoundException(`Game Type: ${gametype} not found`);
		}
		return game;
	}

	async findByTypeWithSummary(gametype: string, paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;

		const returnMaxLimit = Math.min(100, Math.max(0, limit));

		const games = await this.gamesRepository.find({
			where: { gametype: gametype },
			skip: offset,
			take: returnMaxLimit,
			order: {
				gameId: 'DESC'
			}
		});
		if (!games.length) {
			throw new NotFoundException(`Game Type: ${gametype} not found`);
		}

		const withSummary = [];
		for (const game of games) {
			const summary = await this.gameService.findOne(game.gameId);
			withSummary.push(summary);
		}

		return withSummary;
	}
}
