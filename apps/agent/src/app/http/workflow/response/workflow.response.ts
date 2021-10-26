import { ApiProperty } from '@nestjs/swagger';
import { FieldInputData, Store } from '@shared/app/schemas/stores/store.schema';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { User } from 'libs/shared/app/schemas/users/user.schema';

class WorkflowResponseMeta {
  @ApiProperty()
  total_step: number;

  @ApiProperty()
  current_step: number;

  @ApiProperty()
  next_step: string;

  @ApiProperty()
  prev_step: string;
}

export class WorkflowResponse {
  @ApiProperty()
  fields: FieldInputData[];

  @ApiProperty()
  current_step_name: string;

  @ApiProperty({ type: WorkflowResponseMeta })
  meta: WorkflowResponseMeta;
}
