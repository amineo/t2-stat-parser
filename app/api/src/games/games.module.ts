import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesController } from './games.controller';
import { GamesService } from './games.service';

import { Games } from './entities/Games';
import { GameDetail } from '../game/entities/GameDetail';
import { GameModule } from '../game/game.module';

@Module({
	imports: [ TypeOrmModule.forFeature([ Games, GameDetail ]), ConfigModule, GameModule ],
	controllers: [ GamesController ],
	providers: [ GamesService ]
})
export class GamesModule {}
