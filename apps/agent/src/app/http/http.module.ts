import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RouterModule.register(appRoutes), AuthModule],
  providers: [],
})
export default class HttpModule {}
