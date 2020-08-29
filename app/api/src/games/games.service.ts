import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Games } from './entities/Games';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class GamesService {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		@InjectRepository(Games) private readonly gamesRepository: Repository<Games>
	) {}

	async findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;
		const games = await this.gamesRepository.find({
			skip: offset,
			take: limit,
			order: {
				gameId: 'DESC'
			}
		});

		return games;
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
		if (!game) {
			throw new NotFoundException(`Game Type: ${gametype} not found`);
		}
		return game;
	}
}
