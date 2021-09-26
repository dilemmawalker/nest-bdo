import { ApiProperty } from '@nestjs/swagger';
import { Field } from '../../../schemas/fields/field.schema';
import { Workflow } from '../../../schemas/workflows/workflow.schema';

export class WorkflowResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  key: string;

  @ApiProperty()
  fields: Field[];

  static fromWorkflow(workflow: Workflow): WorkflowResponse {
    const entity = new WorkflowResponse();
    entity.name = workflow.name;
    entity.position = workflow.position;
    entity.key = workflow.key;
    return entity;
  }

  static fromWorkflowArray(workflows: Workflow[]): WorkflowResponse[] {
    const entities = [];
    workflows.forEach((workflow) => {
      entities.push(this.fromWorkflow(workflow));
    });
    return entities;
  }
}
