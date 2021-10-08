import { UserDto } from '@core/users/dtos/user.dto';
import { UserService } from '@core/users/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@shared/app/schemas/users/user.schema';
import { TEMP_OTP } from './message/auth.message';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserByOtp(mobile: number, otp: string): Promise<User> {
    const user = await this.usersService.findOneByMobile(mobile);
    if (user && user.otp === otp) {
      return user;
    }
    return null;
  }

  generateOtp(): string {
    if (process.env.SERVER_ENV === 'staging') {
      return TEMP_OTP;
    }
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}
