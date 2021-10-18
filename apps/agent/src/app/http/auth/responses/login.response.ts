import { UserDto } from '@core/users/dtos/user.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/app/schemas/users/user.schema';
import { Types } from 'mongoose';
import { LoginUserDto } from '../dtos/login-user.dto';

@ApiTags('Auth')
export class LoginResponse {
  constructor(token: string, user: LoginUserDto) {
    this.token = token;
    this.user = user;
  }
  @ApiProperty({ required: true })
  token: string;
  @ApiProperty()
  user: LoginUserDto;

  static fromUser(userData: any): LoginUserDto {
    const entity = new LoginUserDto();
    const { user } = userData;
    entity.email = user.email;
    entity.mobile = user.mobile;
    entity.username = user.username;
    entity.userId = user.userId;
    entity.workflowKey = userData.workflowKey;
    entity.agentId = userData.agentId;
    return entity;
  }
}
