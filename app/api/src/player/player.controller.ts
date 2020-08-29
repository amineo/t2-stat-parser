import { Controller, Get, Param } from '@nestjs/common';

import { PlayerService } from './player.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('player')
export class PlayerController {
	constructor(private readonly playerService: PlayerService) {}

	// /player/:playerGuid
	@Get(':playerGuid')
	findOne(@Param('playerGuid') playerGuid: string) {
		return this.playerService.findOne(playerGuid);
	}
}
