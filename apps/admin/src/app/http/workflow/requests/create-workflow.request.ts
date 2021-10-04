import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { WorkflowDto } from '../dtos/workflow.dto';

@ApiTags('Workflow')
export class CreateWorkflowRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  position: number;

  static getWorkFlowDto(createWorkflowRequest: CreateWorkflowRequest) {
    const workflowDto = new WorkflowDto();
    workflowDto.name = createWorkflowRequest.name;
    workflowDto.key = createWorkflowRequest.key;
    workflowDto.position = createWorkflowRequest.position;
    return workflowDto;
  }
}
