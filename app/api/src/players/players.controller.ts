import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { PlayersService } from './players.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('players')
export class PlayersController {
	constructor(private readonly playerService: PlayersService) {}

	// /players
	@Get()
	@ApiOperation({ tags: [ 'Player' ], summary: 'Return a list of players' })
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		const { limit = 10, offset = 0 } = paginationQuery;
		return this.playerService.findAll({ limit, offset });
	}
}
