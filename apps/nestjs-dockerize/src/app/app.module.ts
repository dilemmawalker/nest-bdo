import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { configModuleConfig } from 'src/config/config-module.config';
import { wistonConfig } from 'src/config/wiston.config';
import V1Module from './http/v1/v1.module';

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