import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Field } from '../../../schemas/fields/field.schema';
import { WorkflowDto } from '../dtos/workflow.dto';

@ApiTags('Workflow')
export class AddFieldsRequest {
  @ApiProperty({ type: [Field] })
  @IsNotEmpty()
  fields: Field[];
}
