import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameController } from './game.controller';
import { GameService } from './game.service';

import { GameDetail } from './entities/GameDetail';
import { Games } from '../games/entities/Games';

import { Players } from '../players/entities/Players';

@Module({
	imports: [ TypeOrmModule.forFeature([ Games, GameDetail, Players ]), ConfigModule ],
	controllers: [ GameController ],
	providers: [ GameService ]
})
export class GameModule {}
