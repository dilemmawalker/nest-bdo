import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { validationPipeConfig } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Onboarding Api')
    .setDescription('The api hub for onboarding applications')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig()));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}
bootstrap();
