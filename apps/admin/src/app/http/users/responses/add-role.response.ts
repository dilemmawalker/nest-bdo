import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { User } from '@shared/app/schemas/users/user.schema';
import * as mongoose from 'mongoose';

@ApiTags('Users')
export class AddRoleResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  roles: Role[];

  static fromUser(user: User) {
    const entity = new AddRoleResponse();
    entity.userId = user.userId;
    entity.email = user.email;
    entity.password = user.password;
    entity.username = user.username;
    entity.roles = user.roles;
    return entity;
  }
}
