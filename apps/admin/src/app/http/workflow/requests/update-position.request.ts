import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateWorflowDto } from 'libs/core/workflow/dtos/updateWorkflow.dto';


@ApiTags('Workflow')
export class UpdatePositionRequest {
  @ApiProperty()
  workflowKey: string;

  @ApiProperty()
  stepId: string;

  @ApiProperty()
  fieldId: string;

  @ApiProperty()
  index: number;

  static updatePositionDto(updatePositionRequest: UpdatePositionRequest) {

    const updatePositionDto = new UpdatePositionDto();
    updatePositionDto.stepId = updatePositionRequest.stepId;
    updatePositionDto.workflowKey = updatePositionRequest.workflowKey;
    updatePositionDto.fieldId = updatePositionRequest.fieldId;
    updatePositionDto.index = updatePositionRequest.index;
    return updatePositionDto;

    const updateworkflowDto = new UpdateWorflowDto();
    updateworkflowDto.stepId = updatePositionRequest.stepId;
    updateworkflowDto.workFlowKey = updatePositionRequest.workflowKey;
    updateworkflowDto.fieldId = updatePositionRequest.fieldId;
    updateworkflowDto.index = updatePositionRequest.index;
    return updateworkflowDto;

  }
}
