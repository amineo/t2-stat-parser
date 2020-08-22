import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('games')
export class GamesController {
	constructor(private readonly gameService: GamesService) {}

	// /games
	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		//const { limit, offset } = paginationQuery;
		return this.gameService.findAll({ limit: 100, offset: 0 });
	}

	// /game/:gameId
	@Get(':gameId')
	findOne(@Param('gameId') gameId: string) {
		return '';
	}
}
