import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId, SchemaTypes, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type FieldDocument = Field & Document;

@Schema()
export class Field {
  @ApiProperty()
  @Prop({ required: true })
  label: string;

  @ApiProperty()
  @Prop({ required: true })
  value: string;

  @ApiProperty()
  @Prop({ required: true })
  dataType: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
