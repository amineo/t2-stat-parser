import { Controller, Get, Param, Query } from '@nestjs/common';

import { GamesService } from './games.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('games')
export class GamesController {
	constructor(private readonly gameService: GamesService) {}

	// /games
	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		const { limit = 10, offset = 0 } = paginationQuery;
		return this.gameService.findAll({ limit, offset });
	}

	// /gametype/:gameId
	@Get('gametype/:gametype')
	findByType(@Param('gametype') gametype: string) {
		return this.gameService.findByType(gametype);
	}

	// /games/:gameId
	@Get(':gameId')
	findOne(@Param('gameId') gameId: string) {
		return this.gameService.findOne(gameId);
	}
}
