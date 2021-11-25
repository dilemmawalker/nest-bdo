import { ApiProperty } from '@nestjs/swagger';
import { Step } from '@shared/app/schemas/steps/steps.schema';
import { generateWorkflowUrl } from '@shared/app/utils/function/helper.function';
import { User } from 'libs/shared/app/schemas/users/user.schema';

export class WorkflowStepResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  current_step_url: string;

  @ApiProperty()
  completed = false;

  static fromStep(step: Step, workflowKey: string, storeId: string) {
    const entity = new WorkflowStepResponse();
    entity.name = step.name;
    entity.current_step_url = generateWorkflowUrl(
      workflowKey,
      step.stepId,
      storeId,
    );
    return entity;
  }

  static fromStepsArray(
    steps: Step[],
    workflowKey: string,
    stepId: string,
  ): WorkflowStepResponse[] {
    const entities = [];
    steps.forEach((step) => {
      entities.push(this.fromStep(step, workflowKey, stepId));
    });
    return entities;
  }
}
