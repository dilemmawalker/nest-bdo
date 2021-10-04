import { Role } from 'apps/admin/src/constant/auth/roles.constant';

export class UserDto {
  userId: string;
  email: string;
  age: number;
  password: string;
  username: string;
  roles: Role[];
}
