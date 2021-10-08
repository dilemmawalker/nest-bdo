import { UserDto } from '@core/users/dtos/user.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/app/schemas/users/user.schema';

@ApiTags('Auth')
export class LoginResponse {
  constructor(token: string, user: UserDto) {
    this.token = token;
    this.user = user;
  }
  @ApiProperty({ required: true })
  token: string;
  @ApiProperty()
  user: UserDto;

  static fromUser(user: User) {
    const entity = new UserDto();
    entity.email = user.email;
    entity.mobile = user.mobile;
    entity.username = user.username;
    entity.userId = user.userId;
    return entity;
  }
}
