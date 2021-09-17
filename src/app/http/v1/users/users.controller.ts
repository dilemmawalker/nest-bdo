import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/app/interceptors/transform.interceptor';
import { User } from 'src/app/schemas/users/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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
    const meta = { version: 1.1 }
    return { message: "test", result, meta };
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