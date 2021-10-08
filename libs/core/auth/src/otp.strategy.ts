import { UserDto } from '@core/users/dtos/user.dto';
import { UserService } from '@core/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from './auth.service';
import { AUTH_FAILURE_MESSAGE } from './message/auth.message';

@Injectable()
export class OtpStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {
    super();
  }
  async validate(payload: any): Promise<any> {
    const { mobile, otp } = payload.body;
    let user = await this.authService.validateUserByOtp(mobile, otp);
    if (!user) {
      throw new UnauthorizedException(AUTH_FAILURE_MESSAGE);
    }
    user = await this.userService.updateUserByMobile(mobile, '');
    const userPayload = { user };
    const access_token = this.jwtService.sign(userPayload);
    const roles = user.roles;
    return { access_token, roles, userBody: user };
  }
  static getUserDto(otp: string): UserDto {
    const entity = new UserDto();
    entity.otp = otp;
    return entity;
  }
}
