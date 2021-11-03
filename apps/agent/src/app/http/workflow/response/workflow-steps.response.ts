import { ApiProperty } from '@nestjs/swagger';
import { Step } from '@shared/app/schemas/steps/steps.schema';
import { User } from 'libs/shared/app/schemas/users/user.schema';

export class WorkflowStepResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stepId: string;

  @ApiProperty()
  completed = false;

  static fromStep(step: Step) {
    const entity = new WorkflowStepResponse();
    entity.name = step.name;
    entity.stepId = step.stepId;
    return entity;
  }

  static fromStepsArray(steps: Step[]): WorkflowStepResponse[] {
    const entities = [];
    steps.forEach((step) => {
      entities.push(this.fromStep(step));
    });
    return entities;
  }
}
