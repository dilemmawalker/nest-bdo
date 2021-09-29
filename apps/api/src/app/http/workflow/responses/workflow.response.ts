import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Step } from '../../../schemas/steps/steps.schema';
import { Workflow } from '../../../schemas/workflows/workflow.schema';

export class WorkflowResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  key: string;

  @ApiProperty({ type: [Step] })
  @Prop()
  steps: Step[] = [];

  static fromWorkflow(workflow: Workflow): WorkflowResponse {
    const entity = new WorkflowResponse();
    entity.name = workflow.name;
    entity.position = workflow.position;
    entity.key = workflow.key;
    entity.steps = workflow.steps;
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
