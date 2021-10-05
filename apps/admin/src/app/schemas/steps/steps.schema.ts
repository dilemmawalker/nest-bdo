import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Field } from '../fields/field.schema';
import * as mongoose from 'mongoose';

export type StepDocument = Step & Document;

@Schema()
export class Step {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  stepId: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Field' })
  fields: Types.ObjectId[] = [];

  @ApiProperty()
  position: number;

  @ApiProperty()
  @Prop({ required: true })
  status: string;
}

export const StepSchema = SchemaFactory.createForClass(Step);
