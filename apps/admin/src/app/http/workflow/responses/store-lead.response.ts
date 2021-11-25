import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@shared/app/schemas/fields/field.schema';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';

export class StoreLeadResponse {
  static fromStore(leadFlow: Workflow): any {
    throw new Error('Method not implemented.');
  }
  @ApiProperty()
  fields: any[] = [];

  @ApiProperty()
  stepId: string;

  static fromWorkflow(workflow: Workflow) {
    const entity = new StoreLeadResponse();
    if (workflow && workflow.steps.length > 0) {
      entity.fields = workflow.steps[0].fields;
      entity.stepId = workflow.steps[0].stepId;
    }
    return entity;
  }
}
