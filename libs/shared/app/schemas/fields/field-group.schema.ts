import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed } from 'mongoose';

export type FieldGroupDocument = FieldGroup & Document;

@Schema()
export class FieldGroup {
  @ApiProperty()
  @Prop({ required: true })
  label: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  groupKey: string;

  @ApiProperty()
  @Prop({ required: true })
  options: Mixed;

  @ApiProperty()
  position = 0;

  @ApiProperty()
  @Prop({ required: true })
  type: string;
}

export const FieldGroupSchema = SchemaFactory.createForClass(FieldGroup);
