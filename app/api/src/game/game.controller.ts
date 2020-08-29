import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	// /games/:gameId
	@Get(':gameId')
	@ApiOperation({ summary: 'Find game by Id' })
	findOne(@Param('gameId') gameId: string) {
		return this.gameService.findOne(gameId);
	}
}
