import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesController } from './games.controller';
import { GamesService } from './games.service';

import { Games } from './entities/Games';

@Module({
	imports: [ TypeOrmModule.forFeature([ Games ]), ConfigModule ],
	controllers: [ GamesController ],
	providers: [ GamesService ]
})
export class GamesModule {}
