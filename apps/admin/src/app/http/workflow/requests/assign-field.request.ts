import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AssignFieldDto } from 'libs/core/workflow/dtos/assign-field.dto';

@ApiTags('Workflow')
export class AssignFieldRequest {
  @ApiProperty()
  keyName: string;

  @ApiProperty()
  stepId: string;

  @ApiProperty()
  workflowKey: string;

  static getAssignFieldDto(assignFieldRequest: AssignFieldRequest) {
    const assignFieldDto = new AssignFieldDto();
    assignFieldDto.stepId = assignFieldRequest.stepId;
    assignFieldDto.workflowKey = assignFieldRequest.workflowKey;
    assignFieldDto.keyName = assignFieldRequest.keyName;
    return assignFieldDto;
  }
}
