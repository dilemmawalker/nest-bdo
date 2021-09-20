import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { configModuleConfig } from '../../../../libs/shared/config/config-module.config';
import { wistonConfig } from '../../../../libs/shared/config/wiston.config';
import HttpModule from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig()),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    WinstonModule.forRoot(wistonConfig()),
    HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}