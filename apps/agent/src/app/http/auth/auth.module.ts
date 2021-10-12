import { CoreAuthModule } from '@core/auth/core-auth.module';
import { CoreUserModule } from '@core/users/core-user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [CoreAuthModule, CoreUserModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
