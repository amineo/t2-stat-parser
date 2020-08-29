import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

import { Players } from './entities/Players';
import { GameDetail } from '../game/entities/GameDetail';

@Module({
	imports: [ TypeOrmModule.forFeature([ Players, GameDetail ]), ConfigModule ],
	providers: [ PlayersService ],
	controllers: [ PlayersController ]
})
export class PlayersModule {}
