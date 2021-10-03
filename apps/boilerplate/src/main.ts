import { NestFactory } from '@nestjs/core';
import { BoilerplateModule } from './boilerplate.module';

async function bootstrap() {
  const app = await NestFactory.create(BoilerplateModule);
  await app.listen(3000);
}
bootstrap();
