import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GameModule } from './game/game.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				DATABASE_HOST: Joi.required(),
				DATABASE_PORT: Joi.number().default(5432)
			})
		}),
		TypeOrmModule.forRoot({
			type: 'postgres', // type of our database
			host: process.env.DATABASE_HOST,
			port: +process.env.DATABASE_PORT,
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			autoLoadEntities: true // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
		}),
		GamesModule,
		GameModule
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
