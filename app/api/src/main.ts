import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		credentials: true
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true
			}
		})
	);

	const swaggerOptions = new DocumentBuilder()
		.setTitle('Tribes 2 Stats API')
		.setDescription('Powering stats.playt2.com')
		.setVersion('1.0')
		.addTag('Game')
		.addTag('Player')
		.build();

	const document = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();
