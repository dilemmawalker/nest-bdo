import { CoreUserModule } from '@core/users/core-user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '@shared/config/auth.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { OtpStrategy } from './otp.strategy';

@Module({
  imports: [CoreUserModule, PassportModule, JwtModule.register(jwtConfig)],
  providers: [AuthService, LocalStrategy, JwtStrategy, OtpStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy, OtpStrategy],
})
export class CoreAuthModule {}
