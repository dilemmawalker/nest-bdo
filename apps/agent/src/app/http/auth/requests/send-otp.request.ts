import { UserDto } from '@core/users/dtos/user.dto';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/app/schemas/users/user.schema';
import { use } from 'passport';

@ApiTags('Auth')
export class SendOtpRequest {
  @ApiProperty({ required: true })
  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;

  static getUserDto(otp: string) {
    const userDto = new UserDto();
    userDto.otp = otp;
    return userDto;
  }
}
