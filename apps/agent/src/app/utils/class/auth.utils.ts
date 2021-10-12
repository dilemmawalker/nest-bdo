import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthRequest {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  roles: string[];
}
