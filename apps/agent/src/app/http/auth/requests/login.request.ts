import { UserDto } from '@core/users/dtos/user.dto';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
export class LoginRequest {
  @ApiProperty({ required: true })
  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;

  @ApiProperty({ required: true })
  @Prop({ required: true, min: 100000, max: 999999 })
  otp: string;

  static getUserDto(otp: string) {
    const userDto = new UserDto();
    userDto.otp = otp;
    return userDto;
  }
}
