import { Controller, Get, Query, Param, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ApiOperation } from '@nestjs/swagger';

import { PlayersService } from './players.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import {
	TopAccuracyQueryDto,
	TopWinsQueryDto,
} from '../common/dto/top-players-query.dto';
import { cache } from 'joi';

@Controller('players')
export class PlayersController {
	constructor(
		private readonly playerService: PlayersService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

	// /players
	@Get()
	@ApiOperation({ tags: ['Player'], summary: 'Return a list of players' })
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		const { limit = 10, offset = 0 } = paginationQuery;
		return this.playerService.findAll({ limit, offset });
	}

	@Get('top/accuracy')
	@ApiOperation({
		tags: ['Player', 'Leaderboard'],
		summary: 'Return a leaderboard of players for a specific accuracy stat',
	})
	async findTopAccuracy(@Query() topPlayersQuery: TopAccuracyQueryDto) {
		const {
			stat,
			gameType,
			minGames = 10,
			minShots = 100,
			limit = 10,
			timePeriod,
		} = topPlayersQuery;

		const cacheKey =`topacc_${stat}_${gameType}_${minGames}_${minShots}_${limit}_${timePeriod}`;
		const queryCache = await this.cacheManager.get(cacheKey);

		if(!queryCache){
			const results = await this.playerService.findTopAccuracy({
				stat,
				gameType,
				minGames,
				minShots,
				limit,
				timePeriod,
			});
			
			await this.cacheManager.set(cacheKey, results, { ttl: 3600 * 2 }); // 2 hours
			return results
		}
		
		return queryCache
	}


	@Get('top/wins')
	@ApiOperation({
		tags: ['Player', 'Leaderboard'],
		summary: 'Return a leaderboard of players for win percentage',
	})
	async findTopWins(@Query() topPlayersQuery: TopWinsQueryDto) {
		const { minGames = 100, limit = 10, timePeriod } = topPlayersQuery;

		const cacheKey =`topwins_${minGames}_${limit}_${timePeriod}`;
		const queryCache = await this.cacheManager.get(cacheKey);

		/*
			If we don't have a cache ready, lets make one so the next hit is super fast
			Cache ttl is in seconds
		*/
		if(!queryCache){
			const results = await this.playerService.findTopWins({
				minGames,
				limit,
				timePeriod,
			});

			await this.cacheManager.set(cacheKey, results, { ttl: 3600 * 2 }); // 2 hours
			return results
		}

		return queryCache
	}
}
