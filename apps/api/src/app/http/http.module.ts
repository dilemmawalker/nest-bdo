import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    RouterModule.register(appRoutes),
    UserModule,
  ],
})
export default class HttpModule { }
