import { Role } from '@shared/app/schemas/users/roles.schema';
import { Types } from 'mongoose';

export class UserDto {
  userId: string;
  email: string;
  name: string;
  age: number;
  mobile: number;
  username: string;
  otp: string;
}
