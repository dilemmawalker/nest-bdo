import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { StepDto } from 'libs/core/workflow/dtos/step.dto';

@ApiTags('Workflow')
export class AddStepRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  workflowKey: string;

  @ApiProperty({ required: false })
  stepId?: string;

  static getStepDto(addStepsRequest: AddStepRequest) {
    const stepDto = new StepDto();
    stepDto.name = addStepsRequest.name;
    stepDto.workflowKey = addStepsRequest.workflowKey;
    stepDto.stepId = addStepsRequest.stepId;
    return stepDto;
  }
}
