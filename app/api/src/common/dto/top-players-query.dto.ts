import { IsOptional, IsPositive, IsNotEmpty, IsIn, Max } from 'class-validator';

const filterableGameTypes = ['CTFGame', 'LakRabbitGame'] as const;

type FilterableGameType = typeof filterableGameTypes[number];

const hitStats = [
	'discHitsTG',
	'discDmgHitsTG',
	'discMATG',
	'laserHitsTG',
	'laserMATG',
	'cgHitsTG',
	'shockHitsTG',
	'grenadeHitsTG',
	'grenadeDmgHitsTG',
	'grenadeMATG',
] as const;

type Stat = typeof hitStats[number];

export class TopAccuracyQueryDto {
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

	@IsOptional()
	timePeriod: string;
}

export class TopWinsQueryDto {
	@IsOptional()
	@IsPositive()
	minGames: number;

	@IsOptional()
	@IsPositive()
	@Max(100)
	limit: number;

	@IsOptional()
	timePeriod: string;
}
