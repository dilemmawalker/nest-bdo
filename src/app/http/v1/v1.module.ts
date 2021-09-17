import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { v1Routes } from './v1.route';

@Module({
  imports: [
    RouterModule.register(v1Routes),
    UsersModule,
  ],
})
export default class V1Module { }
