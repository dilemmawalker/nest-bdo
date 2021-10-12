import { UserDto } from '@core/users/dtos/user.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
  MinLength,
} from 'class-validator';

@ApiTags('Users')
export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, type: 'number' })
  @IsInt()
  @Max(9999999999)
  @Min(1000000000)
  mobile: number;

  @ApiProperty({
    description: 'The age of user',
    minimum: 18,
    default: 18,
  })
  age = 18;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  static getUserDto(createUserRequest: CreateUserRequest) {
    const userDto = new UserDto();
    userDto.email = createUserRequest.email;
    userDto.password = createUserRequest.password;
    userDto.age = createUserRequest.age;
    userDto.name = createUserRequest.name;
    userDto.username = createUserRequest.username;
    userDto.mobile = createUserRequest.mobile;
    return userDto;
  }
}
