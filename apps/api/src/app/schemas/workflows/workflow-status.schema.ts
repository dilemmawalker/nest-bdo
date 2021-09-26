import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Workflow } from './workflow.schema';

export type WorkflowStatusDocument = WorkflowStatus & Document;

@Schema()
export class WorkflowStatus {
  @Prop()
  status: boolean;

  @Prop()
  workflow: Workflow;
}

export const WorkflowStatusSchema =
  SchemaFactory.createForClass(WorkflowStatus);
