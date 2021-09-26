import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId, SchemaTypes, Types } from 'mongoose';
import { Workflow, WorkflowSchema } from '../workflows/workflow.schema';

export type FieldDocument = Field & Document;

@Schema()
export class Field {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  label: string;

  @ApiProperty()
  @Prop({ required: true })
  value: string;

  @ApiProperty()
  @Prop({ required: true })
  dataType: string;

  @ApiProperty()
  @Prop()
  position: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Workflow' })
  workflow: Types.ObjectId;
}

export const FieldSchema = SchemaFactory.createForClass(Field);

FieldSchema.virtual('workflows', {
  ref: 'Workflow',
  localField: '_id',
  foreignField: 'fields',
});
