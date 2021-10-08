import { Role } from '@shared/app/schemas/users/roles.schema';
import { Types } from 'mongoose';

export class UserDto {
  userId: string;
  email: string;
  age: number;
  mobile: number;
  password: string;
  username: string;
  otp: string;
}
