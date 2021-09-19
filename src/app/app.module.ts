import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import V1Module from 'apps/nestjs-dockerize/src/app/http/v1/v1.module';
import { configModuleConfig } from 'apps/nestjs-dockerize/src/config/config-module.config';
import { wistonConfig } from 'apps/nestjs-dockerize/src/config/wiston.config';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig()),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    WinstonModule.forRoot(wistonConfig()),
    V1Module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}