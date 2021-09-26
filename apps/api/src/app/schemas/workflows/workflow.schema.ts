import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, SchemaTypeOptions, SchemaTypes, Types } from 'mongoose';
import { Field } from '../fields/field.schema';

export type WorkflowDocument = Workflow & Document;

@Schema()
export class Workflow {
  @Prop({ required: true })
  name: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Field' }])
  fields!: Types.ObjectId[];

  position: number;

  @Prop({ required: true, unique: true })
  key: string;
}

export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
