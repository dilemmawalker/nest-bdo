import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@shared/app/schemas/users/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    const user = await this.UserRepository.findOne({ userId });
    if (user) {
      console.log(user);
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

  async updateUser(userId: string, userDto: UserDto): Promise<User> {
    return await this.UserRepository.findOneAndUpdate({ userId }, userDto);
  }
}
