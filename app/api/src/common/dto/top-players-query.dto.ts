import { IsOptional, IsPositive, IsNotEmpty, IsIn, Max } from 'class-validator';

const filterableGameTypes = [
  'CTFGame',
  'LakRabbitGame'
] as const;

type FilterableGameType = typeof filterableGameTypes[number];

const hitStats = [
	'discHitsTG',
	'discDmgHitsTG',
	'discMATG',
	'laserHitsTG',
	'laserMATG',
	'cgHitsTG',
	'shockHitsTG'
] as const;

type Stat = typeof hitStats[number];

export class TopPlayersQueryDto {
	@IsNotEmpty()
	@IsIn(hitStats as any)
	stat: Stat;

	@IsOptional()
	@IsIn(filterableGameTypes as any)
	gameType: FilterableGameType;

	@IsOptional()
	@IsPositive()
	minGames: number;

	@IsOptional()
	@IsPositive()
	minShots: number;

	@IsOptional()
	@IsPositive()
	@Max(100)
	limit: number;
}
