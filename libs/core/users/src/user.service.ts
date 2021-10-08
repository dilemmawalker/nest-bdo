import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@shared/app/schemas/users/user.schema';
import { Role } from 'apps/admin/src/constant/auth/roles.constant';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}

  async findOne(username: string): Promise<User> {
    const user = await this.UserRepository.findOne({ username });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async getUsers(): Promise<User[]> {
    return await this.UserRepository.find({});
  }

  async createUser(userDto: UserDto): Promise<User> {
    userDto.userId = uuidv4();
    return await this.UserRepository.create(userDto);
  }

  async updateUser(username: string, userDto: UserDto): Promise<User> {
    return await this.UserRepository.findOneAndUpdate({ username }, userDto);
  }

  async findOneByMobile(mobile: number): Promise<User> {
    const user = this.UserRepository.findOne({ mobile });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async updateUserByMobile(mobile: number, otp: string): Promise<User> {
    const entity = new UserDto();
    entity.otp = otp;
    return await this.UserRepository.findOneAndUpdate({ mobile }, entity);
  }
}
