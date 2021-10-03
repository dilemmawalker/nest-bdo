import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from '../app.route';

@Module({
  imports: [RouterModule.register(appRoutes)],
  providers: [],
})
export default class HttpModule {}
