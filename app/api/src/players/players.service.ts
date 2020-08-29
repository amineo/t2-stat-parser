import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Players } from './entities/Players';
import { GameDetail } from '../game/entities/GameDetail';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

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
		const players = await this.playersRepository.find({
			skip: offset,
			take: limit,
			order: {
				playerName: 'DESC'
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
}
