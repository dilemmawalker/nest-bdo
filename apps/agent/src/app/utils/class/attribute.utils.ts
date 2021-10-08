import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthRequest {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  key: string;
}

export class AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  roles: string[];
}
