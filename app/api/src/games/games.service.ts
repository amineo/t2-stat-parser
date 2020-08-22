import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, Repository } from 'typeorm';

import { Games } from './entities/Games';
import { InjectRepository } from '@nestjs/typeorm';
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
			take: limit
		});

		return games;
	}
}
