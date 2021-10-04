import { CoreAuthModule } from '@core/auth/core-auth.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [CoreAuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
