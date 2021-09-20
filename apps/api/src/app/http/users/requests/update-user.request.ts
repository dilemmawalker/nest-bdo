import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../../../../../libs/core/users/src/dtos/user.dto';
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