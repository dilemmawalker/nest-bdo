import { UserDto } from '@core/users/dtos/user.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('Users')
export class UpdateStoreStatusRequest {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  reason: string;
}
