import { AuthService } from '@core/auth/auth.service';
import {
  OTP_SUCCESS_MESSAGE,
  AUTH_SUCCESS_MESSAGE,
} from '@core/auth/message/auth.message';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { SendOtpResponse } from './responses/send-otp.response';
import { LoginResponse } from './responses/login.response';
import { SendOtpRequest } from './requests/send-otp.request';
import { UserService } from '@core/users/user.service';
import { OtpAuthGuard } from '../../guards/otp-auth.guard';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiResponse({
    status: 200,
    type: SendOtpResponse,
  })
  @Post('send-otp')
  async sendOtp(@Body() sendOtpRequest: SendOtpRequest) {
    const user = await this.userService.updateUserByMobile(
      sendOtpRequest.mobile,
      this.authService.generateOtp(),
    );
    return ResponseUtils.success(
      new SendOtpResponse(user.mobile),
      OTP_SUCCESS_MESSAGE,
    );
  }

  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  @UseGuards(OtpAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return ResponseUtils.success(
      new LoginResponse(
        req.user.access_token,
        LoginResponse.fromUser(req.user.userBody),
      ),
      AUTH_SUCCESS_MESSAGE,
    );
  }
}
