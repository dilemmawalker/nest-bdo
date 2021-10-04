import { AuthService } from '@core/auth/auth.service';
import { OTP_SUCCESS_MESSAGE } from '@core/auth/message/auth.message';
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
import { LocalAuthGuard } from 'apps/admin/src/app/guards/local-auth.guard';
import { SendOtpRequest } from './requests/send-otp.request';
import { SendOtpResponse } from './responses/send-otp.response';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    type: SendOtpResponse,
  })
  @UseGuards(LocalAuthGuard)
  @Post('send-otp')
  async login(@Body() sendOtpRequest: SendOtpRequest, @Request() req) {
    return ResponseUtils.success(new SendOtpResponse(), OTP_SUCCESS_MESSAGE);
  }
}
