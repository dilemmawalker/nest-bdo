import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipeConfig } from './config/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig()));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}
bootstrap();
