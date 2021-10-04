import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  position: number;

  @Prop({ required: true, unique: true })
  key: string;
}

export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
