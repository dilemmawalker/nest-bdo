import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/app/interceptors/transform.interceptor';
import { User } from 'src/app/schemas/users/user.schema';
import responseUtils from 'src/app/utils/response.utils';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user-response.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getUsers(): Promise<any> {
    const result = await this.usersService.getUsers();
    return responseUtils.success(result);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto.email, createUserDto.age)
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}