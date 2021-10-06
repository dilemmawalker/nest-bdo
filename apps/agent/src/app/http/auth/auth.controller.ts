import { AuthService } from '@core/auth/auth.service';
import {
  OTP_SUCCESS_MESSAGE,
  AUTH_SUCCESS_MESSAGE,
  TEMP_OTP,
  USER_NOT_FOUND_MESSAGE,
  AUTH_FAILURE_MESSAGE,
} from '@core/auth/message/auth.message';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { LoginRequest } from './requests/login.request';
import { SendOtpResponse } from './responses/send-otp.response';
import { LoginResponse } from './responses/login.response';
import { SendOtpRequest } from './requests/send-otp.request';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    type: SendOtpResponse,
  })
  @Post('send-otp')
  async sendOtp(@Body() sendOtpRequest: SendOtpRequest, @Request() req) {
    const user = await this.authService.updateUserOtp(
      sendOtpRequest.mobile,
      SendOtpRequest.getUserDto(TEMP_OTP),
    );
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND_MESSAGE);
    }
    return ResponseUtils.success(
      new SendOtpResponse(SendOtpResponse.fromUser(user)),
      OTP_SUCCESS_MESSAGE,
    );
  }

  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  @Post('login')
  async login(@Body() loginRequest: LoginRequest, @Request() req) {
    let user = await this.authService.validateUserByOtp(
      loginRequest.mobile,
      loginRequest.otp,
    );
    if (!user) {
      throw new UnauthorizedException(AUTH_FAILURE_MESSAGE);
    }
    user = await this.authService.updateUserOtp(
      loginRequest.mobile,
      LoginRequest.getUserDto(''),
    );
    const token = await this.authService.login(user);
    return ResponseUtils.success(
      new LoginResponse(token.access_token),
      AUTH_SUCCESS_MESSAGE,
    );
  }
}
