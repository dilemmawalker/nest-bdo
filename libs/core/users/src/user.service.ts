import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@shared/app/schemas/users/user.schema';
import { RoleDto } from 'libs/core/roles/src/dtos/role.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async create(userDto: UserDto): Promise<User> {
    userDto.userId = uuidv4();
    return await this.userRepository.create(userDto);
  }

  async update(username: string, userDto: UserDto): Promise<User> {
    return await this.userRepository.findOneAndUpdate({ username }, userDto);
  }

  async findOneByMobile(mobile: number): Promise<User> {
    const user = await this.userRepository.findOne({ mobile });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async updateOtp(mobile: number, otp: string): Promise<User> {
    const user = await this.findOneByMobile(mobile);
    user.otp = otp;
    return await this.update(user.username, user);
  }

  async addRole(userId: string, roleDto: RoleDto) {
    return await this.userRepository.addRole(userId, roleDto);
  }
}
