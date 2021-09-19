import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { UserModule } from './users/user.module';
import { v1Routes } from './v1.route';

@Module({
  imports: [
    RouterModule.register(v1Routes),
    UserModule,
  ],
})
export default class V1Module { }
