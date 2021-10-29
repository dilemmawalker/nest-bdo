import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UpdateWorkflowDocument = UpdateWorkflow & Document;

@Schema()
export class UpdateWorkflow {
  @Prop({ required: true })
  stepId: string;

  @Prop()
  index: number;

  @Prop()
  workFlowKey: string;

  @Prop()
  fieldId: string;
}

export const UpdateWorkflowSchema =
  SchemaFactory.createForClass(UpdateWorkflow);
