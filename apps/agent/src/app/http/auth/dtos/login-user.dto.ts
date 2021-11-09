import { Types } from 'mongoose';

export class LoginUserDto {
  userId: string;
  email: string;
  name: string;
  age: number;
  mobile: number;
  password: string;
  username: string;
  otp: string;
  agentId: string;
  leadUrl: string;
  clusterManagerId: string;
}
