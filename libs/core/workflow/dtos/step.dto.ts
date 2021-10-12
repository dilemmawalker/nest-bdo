import { DEFAULT_STEP_POSITION } from 'apps/admin/src/constant/workflows/workflow.constant';
import { Field } from '../../../../apps/admin/src/app/schemas/fields/field.schema';

export class StepDto {
  name: string;
  position: number = DEFAULT_STEP_POSITION;
  stepId: string;
  workflowKey: string;
}
