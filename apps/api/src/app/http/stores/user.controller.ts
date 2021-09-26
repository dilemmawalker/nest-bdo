import { UserService } from '@core/users/user.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/response.utils';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateUserRequest } from './requests/create-user.request';
import { UpdateUserRequest } from './requests/update-user.request';
import { UserResponse } from './responses/user.response';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly UserService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get(':username')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
  })
  async getUser(@Param('username') username: string): Promise<any> {
    const user = await this.UserService.findOne(username);
    return ResponseUtils.success(UserResponse.fromUser(user));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
  })
  @Get()
  async getUsers(@Request() req): Promise<any> {
    const user = await this.UserService.getUsers();
    return ResponseUtils.success(UserResponse.fromUserArray(user));
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<any> {
    const user = await this.UserService.createUser(
      CreateUserRequest.getUserDto(createUserRequest),
    );
    return ResponseUtils.success(UserResponse.fromUser(user));
  }

  @Patch(':username')
  @UseInterceptors(TransformInterceptor)
  async updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<any> {
    const userDto = UpdateUserRequest.getUserDto(updateUserDto);
    userDto.username = username;
    const user = await this.UserService.updateUser(username, userDto);
    return ResponseUtils.success(UserResponse.fromUser(user));
  }
}
