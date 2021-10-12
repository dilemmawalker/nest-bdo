import { ApiProperty } from '@nestjs/swagger';
import { User } from 'libs/shared/app/schemas/users/user.schema';

export class UserResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;

  static fromUser(user: User) {
    const entity = new UserResponse();
    entity.userId = user.userId;
    entity.email = user.email;
    entity.password = user.password;
    entity.username = user.username;
    return entity;
  }

  static fromUserArray(users: User[]): UserResponse[] {
    const entities = [];
    users.forEach((user) => {
      entities.push(this.fromUser(user));
    });
    return entities;
  }
}
