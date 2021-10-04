import { UserDto } from '@core/users/dtos/user.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@ApiTags('Users')
export class CreateUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
    userDto.username = createUserRequest.username;
    return userDto;
  }
}
