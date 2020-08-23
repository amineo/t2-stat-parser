import { Controller, Get, Param, Query } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	// /games/:gameId
	@Get(':gameId')
	findOne(@Param('gameId') gameId: string) {
		return this.gameService.findOne(gameId);
	}
}
