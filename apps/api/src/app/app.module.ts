import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configModuleConfig } from '@shared/config/config-module.config';
import { wistonConfig } from '@shared/config/wiston.config';
import { WinstonModule } from 'nest-winston';
import HttpModule from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig()),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    WinstonModule.forRoot(wistonConfig()),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
