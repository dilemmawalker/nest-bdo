import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type ValidationDocument = Validation & Document;

@Schema()
export class Validation {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop()
  options: any[];

  @ApiProperty()
  @Prop()
  type: string;

  @ApiProperty()
  @Prop({ required: true })
  status: boolean;
}

export const ValidationSchema = SchemaFactory.createForClass(Validation);
