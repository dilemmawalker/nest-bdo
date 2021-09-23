import { Role } from 'apps/api/src/constant/auth/roles.constant';

export class UserDto {
  userId: string;
  email: string;
  age: number;
  password: string;
  username: string;
  roles: Role[];
}
