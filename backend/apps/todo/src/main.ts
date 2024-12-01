import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { createValidationException } from './exception/validation-exception.filter';
import { NotFoundExceptionFilter } from './exception/not-found-exception.filter';
import { ServerExceptionFilter } from './exception/server-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Optionally send the error to an external logging service
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Optionally log or handle the rejection
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => createValidationException(errors),
      stopAtFirstError: true,
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that do not have decorators
      forbidNonWhitelisted: true,
    }),
  );
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('API documentation for the Todos service')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new ServerExceptionFilter());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(process.env.BACKEND_PORT || 4000);
}
bootstrap();
