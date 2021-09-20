import { Body, Controller, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserRequest } from './requests/create-user.request';
import { UpdateUserRequest } from './requests/update-user.request';
import { UserResponse } from './responses/user.response';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@core/users/user.service';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/response.utils';


@ApiTags('Users')
@Controller('users')
export class UserController {

  constructor(private readonly UserService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

  @Get(':userId')
  @UseInterceptors(TransformInterceptor)
  async getUser(@Param('userId') userId: string): Promise<any> {
    const user = await this.UserService.getUserById(userId);
    return ResponseUtils.success(UserResponse.fromUser(user));
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getUsers(): Promise<any> {
    this.logger.error("test error ok");
    const user = await this.UserService.getUsers();
    return ResponseUtils.success(UserResponse.fromUserArray(user));
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  async createUser(@Body() createUserDto: CreateUserRequest): Promise<object> {
    const user = await this.UserService.createUser(createUserDto.email, createUserDto.age);
    return ResponseUtils.success(UserResponse.fromUser(user));
  }

  @Patch(':userId')
  @UseInterceptors(TransformInterceptor)
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserRequest): Promise<object> {
    const user = await this.UserService.updateUser(userId, UpdateUserRequest.getUserDto(updateUserDto));
    return ResponseUtils.success(UserResponse.fromUser(user));
  }
}