import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { configModuleConfig } from '@shared/config/config-module.config';
import { wistonConfig } from '@shared/config/wiston.config';
import { WinstonModule } from 'nest-winston';
import HttpModule from './http/http.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    ConfigModule.forRoot(configModuleConfig()),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    WinstonModule.forRoot(wistonConfig()),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
