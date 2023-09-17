import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApplicationLogger } from './middlewares/logger.middleware';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api/');
  const config = new DocumentBuilder()
    .setTitle('Ecommerce docs')
    .setDescription('Ecommerce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['*'],
    credentials: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use(ApplicationLogger);
  app.enableCors({
    origin: ['http://localhost:4000'],
    methods: ['*'],
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();
