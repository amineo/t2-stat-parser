import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { GamesService } from './games.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	// /games
	@Get()
	@ApiOperation({ tags: [ 'Game' ], summary: 'Return the latest games' })
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		const { limit = 10, offset = 0 } = paginationQuery;
		return this.gamesService.findAll({ limit, offset });
	}

	// /games/summary
	@Get('summary')
	@ApiOperation({ tags: [ 'Game' ], summary: 'Return the latest games with summary' })
	findAllWithSummary(@Query() paginationQuery: PaginationQueryDto) {
		const { limit = 10, offset = 0 } = paginationQuery;

		return this.gamesService.findAllWithSummary({ limit, offset });
	}

	// /games/gametype/:gametype
	@Get('gametype/:gametype')
	@ApiOperation({ tags: [ 'Game' ], summary: 'Return the latest games by game type' })
	findByType(@Param('gametype') gametype: string) {
		return this.gamesService.findByType(gametype);
	}

	// /games/gametype/CTFGame/summary
	@Get('gametype/:gametype/summary')
	@ApiOperation({ tags: [ 'Game' ], summary: 'Return the latest games by game type with game summaries' })
	findByTypeWithSummary(@Param('gametype') gametype: string, @Query() paginationQuery: PaginationQueryDto) {
		const { limit = 10, offset = 0 } = paginationQuery;

		return this.gamesService.findByTypeWithSummary(gametype, { limit, offset });
	}
}
