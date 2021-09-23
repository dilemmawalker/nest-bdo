import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/response.utils';
import { Role } from 'apps/api/src/constant/auth/roles.constant';
import { Roles } from '../../decorators/auth/roles.decorators';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { UserResponse } from '../users/responses/user.response';
import { AuthService } from './auth.service';
import { AUTH_SUCCESS_MESSAGE } from './message/auth.message';
import { LoginRequest } from './requests/login.request';
import { LoginResponse } from './response/login.response';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginRequest: LoginRequest, @Request() req) {
    return ResponseUtils.success(
      new LoginResponse(req.user.access_token),
      AUTH_SUCCESS_MESSAGE,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('protected')
  ok() {
    return ResponseUtils.success('yeah ok');
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: UserResponse,
  })
  @Get('admin')
  async adminRole(@Request() req): Promise<any> {
    return ResponseUtils.success('yeah, you have admin access');
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: UserResponse,
  })
  @Get('user')
  async userRole(@Request() req): Promise<any> {
    return ResponseUtils.success('yeah, you have user access');
  }
}
