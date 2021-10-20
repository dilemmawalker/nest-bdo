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
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AddRoleRequest } from './requests/add-role.request';
import { CreateUserRequest } from './requests/create-user.request';
import { UpdateUserRequest } from './requests/update-user.request';
import { AddRoleResponse } from './responses/add-role.response';
import { UserResponse } from './responses/user.response';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get(':username')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
  })
  async getUser(@Param('username') username: string): Promise<any> {
    const user = await this.userService.findOne(username);
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
    const user = await this.userService.getUsers();
    return ResponseUtils.success(UserResponse.fromUserArray(user));
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  async create(@Body() createUserRequest: CreateUserRequest): Promise<any> {
    const user = await this.userService.create(
      CreateUserRequest.getUserDto(createUserRequest),
    );
    return ResponseUtils.success(UserResponse.fromUser(user));
  }

  @Patch(':userId')
  @UseInterceptors(TransformInterceptor)
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<any> {
    const user = await this.userService.update(
      userId,
      UpdateUserRequest.getUserDto(updateUserDto),
    );
    return ResponseUtils.success(UserResponse.fromUser(user));
  }

  @Post('roles/add')
  @ApiResponse({
    status: HttpStatus.OK,
    type: AddRoleResponse,
  })
  @UseInterceptors(TransformInterceptor)
  async addRoles(@Body() addRoleRequest: AddRoleRequest): Promise<any> {
    const user = await this.userService.addRole(
      addRoleRequest.userId,
      AddRoleRequest.getRoleDto(addRoleRequest),
    );
    return ResponseUtils.success(AddRoleResponse.fromUser(user));
  }
}
