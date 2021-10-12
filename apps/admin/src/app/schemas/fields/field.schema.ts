import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed } from 'mongoose';

export type FieldDocument = Field & Document;

@Schema()
export class Field {
  @ApiProperty()
  @Prop({ required: true })
  label: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  keyName: string;

  @ApiProperty()
  @Prop({ required: true })
  options: Mixed;

  @ApiProperty()
  position = 0;

  @ApiProperty()
  @Prop({ required: true })
  dataType: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
