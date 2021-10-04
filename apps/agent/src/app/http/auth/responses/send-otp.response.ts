import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
export class SendOtpResponse {
  @ApiProperty()
  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;
}
