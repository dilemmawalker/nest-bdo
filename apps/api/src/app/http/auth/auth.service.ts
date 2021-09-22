import { UserService } from '@core/users/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@shared/app/schemas/users/user.schema';

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
}
