import { UserDto } from '@core/users/dtos/user.dto';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/app/schemas/users/user.schema';

@ApiTags('Auth')
export class SendOtpResponse {
  constructor(mobile: number) {
    this.mobile = mobile;
  }
  @ApiProperty({ required: true })
  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;
}
