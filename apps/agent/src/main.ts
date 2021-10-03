import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { validationPipeConfig } from '@shared/config/validation-pipe.config';
import { AppModule } from './app/app.module';
import { swaggerConfig } from './config/swagger.config';
import { SWAGGER_API_PATH } from './constant/swagger/swagger.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(SWAGGER_API_PATH, app, document);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig()));
  const port = parseInt(process.env.AGENT_SERVER_PORT);
  console.log('running on port ' + port);
  await app.listen(port);
}
bootstrap();
