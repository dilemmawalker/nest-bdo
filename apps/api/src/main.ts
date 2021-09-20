import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '@shared/config/swagger.config';
import { validationPipeConfig } from '@shared/config/validation-pipe.config';
import { SWAGGER_API_PATH } from '@shared/constant/swagger.constant';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(SWAGGER_API_PATH, app, document);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig()));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}
bootstrap();
