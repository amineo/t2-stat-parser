import { Controller, Get, Query, Param } from '@nestjs/common';

import { PlayersService } from './players.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('players')
export class PlayersController {
	constructor(private readonly playerService: PlayersService) {}

	// /players
	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		const { limit = 10, offset = 0 } = paginationQuery;
		return this.playerService.findAll({ limit, offset });
	}

	// /players/:playerGuid
	@Get(':playerGuid')
	findOne(@Param('playerGuid') playerGuid: string) {
		return this.playerService.findOne(playerGuid);
	}
}
