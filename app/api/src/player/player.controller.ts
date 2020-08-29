import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
	constructor(private readonly playerService: PlayerService) {}

	// /player/:playerGuid
	@Get(':playerGuid')
	@ApiOperation({ tags: [ 'Player' ], summary: 'Return player stats by guid' })
	findOne(@Param('playerGuid') playerGuid: string) {
		return this.playerService.findOne(playerGuid);
	}
}
