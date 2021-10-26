import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_WORKFLOW_POSITION } from 'apps/admin/src/constant/workflows/workflow.constant';
import { Document, Types } from 'mongoose';
import { Step } from '../steps/steps.schema';

export type WorkflowDocument = Workflow & Document;

@Schema()
export class Workflow {
  @Prop({ required: true })
  name: string;

  @Prop()
  steps: Step[] = [];

  @Prop()
  position: number = DEFAULT_WORKFLOW_POSITION;

  @Prop({ required: true, unique: true })
  key: string;
}

export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
