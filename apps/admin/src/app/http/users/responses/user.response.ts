import { ApiProperty } from '@nestjs/swagger';
import { User } from 'libs/shared/app/schemas/users/user.schema';

export class UserResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
=======
  mobile: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  name: string;

  static fromUser(user: User) {
    const entity = new UserResponse();
    entity.userId = user.userId;
    entity.email = user.email;
=======
    entity.mobile = user.mobile;
    entity.username = user.username;
    entity.age = user.age;
    entity.name = user.name;
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
