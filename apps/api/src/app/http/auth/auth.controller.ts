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
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
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
  @Get('secret')
  ok() {
    return ResponseUtils.success('yeah ok');
  }
}
