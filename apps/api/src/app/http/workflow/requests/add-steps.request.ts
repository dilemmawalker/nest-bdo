import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { StepDto } from '../dtos/step.dto';

@ApiTags('Workflow')
export class AddStepRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  key: string;

  static getStepDto(addStepsRequest: AddStepRequest) {
    const stepDto = new StepDto();
    stepDto.name = addStepsRequest.name;
    stepDto.position = addStepsRequest.position;
    stepDto.key = addStepsRequest.key;
    return stepDto;
  }
}
