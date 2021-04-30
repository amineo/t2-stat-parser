import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { PlayersService } from './players.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { TopPlayersQueryDto } from '../common/dto/top-players-query.dto';

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

	@Get('top/accuracy')
	@ApiOperation({
		tags: [ 'Player', 'Leaderboard' ],
		summary: 'Return a leaderboard of players for a specific accuracy stat'
	})
	findTop(@Query() topPlayersQuery: TopPlayersQueryDto) {
		const {
			stat,
			gameType,
			minGames = 10,
			minShots = 100,
			limit = 10
		} = topPlayersQuery;
		return this.playerService.findTop({
			stat,
			gameType,
			minGames,
			minShots,
			limit
		});
	}
}
