import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

import { Players } from '../players/entities/Players';
import { GameDetail } from '../game/entities/GameDetail';

@Module({
	imports: [ TypeOrmModule.forFeature([ Players, GameDetail ]), ConfigModule ],
	controllers: [ PlayerController ],
	providers: [ PlayerService ]
})
export class PlayerModule {}
