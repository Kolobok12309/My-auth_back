import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ValidationPipe } from '@nestjs/common';

import AppModule from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Documentation by swagger
  const options = new DocumentBuilder()
    .setTitle('MyAuth system')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  // Global validation by class-validator
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
