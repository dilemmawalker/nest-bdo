import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
export class CreateUserRequest {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    email: string;
    @ApiProperty({
        description: 'The age of user',
        minimum: 18,
        default: 18,
      })
      
    age: number;
}