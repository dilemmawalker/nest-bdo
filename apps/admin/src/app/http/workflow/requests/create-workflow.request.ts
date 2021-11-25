import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { WorkflowDto } from '../../../../../../../libs/core/workflow/dtos/workflow.dto';

@ApiTags('Workflow')
export class CreateWorkflowRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  key: string;

  static getWorkFlowDto(createWorkflowRequest: CreateWorkflowRequest) {
    const workflowDto = new WorkflowDto();
    workflowDto.name = createWorkflowRequest.name;
    workflowDto.key = createWorkflowRequest.key;
    return workflowDto;
  }
}
