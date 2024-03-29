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
				datestamp: 'DESC'
			}
		});

		const abvSummary = [];
		for (const game of games) {
			const summary = await this.gameService.findOneAbvSummary(game.gameId);
			abvSummary.push(summary);
		}

		// Only return games when the score is greater than 1
		return abvSummary.filter((g) => g.totalScore > 1);
	}

	async findAllWithSummary(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;

		const returnMaxLimit = Math.min(100, Math.max(0, limit));

		const games = await this.gamesRepository.find({
			skip: offset,
			take: returnMaxLimit,
			order: {
				datestamp: 'DESC'
			}
		});

		const withSummary = [];
		for (const game of games) {
			const summary = await this.gameService.findOne(game.gameId);
			withSummary.push(summary);
		}

		return withSummary;
	}

	async findByType(gametype: string, paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;
		const returnMaxLimit = Math.min(100, Math.max(0, limit));

		const games = await this.gamesRepository.find({
			where: { gametype: gametype },
			skip: offset,
			take: returnMaxLimit,
			order: {
				datestamp: 'DESC'
			}
		});
		if (!games.length) {
			throw new NotFoundException(`Game Type: ${gametype} not found`);
		}

		const abvSummary = [];
		for (const game of games) {
			const summary = await this.gameService.findOneAbvSummary(game.gameId);
			abvSummary.push(summary);
		}

		// Only return games when the score is greater than 1
		return abvSummary.filter((g) => g.totalScore > 1);
	}

	async findByTypeWithSummary(gametype: string, paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;

		const returnMaxLimit = Math.min(100, Math.max(0, limit));

		const games = await this.gamesRepository.find({
			where: { gametype: gametype },
			skip: offset,
			take: returnMaxLimit,
			order: {
				datestamp: 'DESC'
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
