import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { validationPipeConfig } from '@shared/config/validation-pipe.config';
import { AppModule } from './app/app.module';
import * as basicAuth from 'express-basic-auth';
import { basicAuthConfig, swaggerConfig } from './config/swagger.config';
import { SWAGGER_API_PATH } from './constant/swagger/swagger.constant';
import { toUriPath } from '@shared/app/utils/function/helper.function';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(toUriPath(SWAGGER_API_PATH), basicAuth(basicAuthConfig));
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(SWAGGER_API_PATH, app, document);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig()));

  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}
bootstrap();
