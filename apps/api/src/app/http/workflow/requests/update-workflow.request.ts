import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdateWorkflowRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  position: number;
}
