import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { GameDetail } from './entities/GameDetail';

@Injectable()
export class GameService {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		@InjectRepository(GameDetail) private readonly gameRepository: Repository<GameDetail>
	) {}

	async findOne(gameId: string) {
		const game = await this.gameRepository.find({ where: { gameId: gameId } });
		if (!game) {
			throw new NotFoundException(`Game ID: ${gameId} not found`);
		}
		return game;
	}
}
