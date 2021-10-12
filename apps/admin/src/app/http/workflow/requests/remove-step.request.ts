import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('Workflow')
export class RemoveStepRequest {
  @ApiProperty()
  @IsNotEmpty()
  stepId: string;

  @ApiProperty()
  @IsNotEmpty()
  workflowKey: string;
}
