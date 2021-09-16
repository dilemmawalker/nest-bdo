import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const { MongoClient } = require('mongodb');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}
bootstrap();
