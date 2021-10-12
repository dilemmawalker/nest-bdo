import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AssignFieldDto } from '../dtos/assign-field.dto';
import { FieldsDto } from '../dtos/fields.dto';

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
