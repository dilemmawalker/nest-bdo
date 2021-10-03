import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { type } from 'os';

@ApiTags('Auth')
export class SendOtpRequest {
  @ApiProperty()
  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;
}
