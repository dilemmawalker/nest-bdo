import { DEFAULT_STEP_POSITION } from 'apps/admin/src/constant/workflows/workflow.constant';

export class StepDto {
  name: string;
  position: number = DEFAULT_STEP_POSITION;
  stepId: string;
  workflowKey: string;
}
