import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [RouterModule.register(appRoutes), UserModule, AuthModule],
  providers: [],
})
export default class HttpModule {}
