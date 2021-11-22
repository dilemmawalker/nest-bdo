import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Expression } from './expression.schema';
export type FieldDocument = Field & Document;

@Schema()
export class Field {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  label: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  keyName: string;

  @ApiProperty()
  @Prop({ required: true })
  options: Mixed;

  @Prop({ required: true })
  isEditable: boolean;

  @Prop()
  expression: Expression;

  @ApiProperty()
  position = 0;

  @ApiProperty()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Field' })
  groups: Types.ObjectId[] = [];

  @ApiProperty()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Validation' })
  validations: Types.ObjectId[] = [];

  @ApiProperty()
  @Prop({ required: true })
  type: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
