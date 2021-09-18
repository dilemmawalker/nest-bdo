import { Body, Controller, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/app/interceptors/transform.interceptor';
import responseUtils from 'src/app/utils/response.utils';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponse } from './responses/user.response';
import { UserService } from './user.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';


@Controller('users')
export class UserController {

  constructor(private readonly UserService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

  @Get(':userId')
  @UseInterceptors(TransformInterceptor)
  async getUser(@Param('userId') userId: string): Promise<any> {
    const user = await this.UserService.getUserById(userId);
    return responseUtils.success(UserResponse.fromUser(user));
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getUsers(): Promise<any> {
    this.logger.warn("test");
    const user = await this.UserService.getUsers();
    return responseUtils.success(UserResponse.fromUserArray(user));
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<object> {
    const user = await this.UserService.createUser(createUserDto.email, createUserDto.age);
    return responseUtils.success(UserResponse.fromUser(user));
  }

  @Patch(':userId')
  @UseInterceptors(TransformInterceptor)
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<object> {
    const user = await this.UserService.updateUser(userId, updateUserDto);
    return responseUtils.success(UserResponse.fromUser(user));
  }
}