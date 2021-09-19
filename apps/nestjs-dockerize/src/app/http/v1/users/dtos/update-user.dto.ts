import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    age: number;
}