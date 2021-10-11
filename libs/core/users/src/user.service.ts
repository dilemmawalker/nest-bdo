import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@shared/app/schemas/users/user.schema';
import { Role } from 'apps/admin/src/constant/auth/roles.constant';
import { RoleDto } from 'libs/core/roles/src/dtos/role.dto';
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

  async addRole(userId: string, roleDto: RoleDto) {
    return await this.UserRepository.addRole(userId, roleDto);
  }
}
