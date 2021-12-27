import { UserDto } from '@core/users/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

  static getUserDto(updateUserRequest: UpdateUserRequest) {
    const userDto = new UserDto();
    userDto.email = updateUserRequest.email;
    userDto.age = updateUserRequest.age;
    return userDto;
  }
}
