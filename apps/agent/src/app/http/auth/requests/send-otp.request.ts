import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
export class SendOtpRequest {
  @ApiProperty({ required: true })
  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;

  @ApiProperty({ required: true })
  @Prop({ required: true, min: 100000, max: 999999 })
  otp: number;
}
