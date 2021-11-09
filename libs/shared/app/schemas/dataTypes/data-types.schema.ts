import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type DataTypeDocument = DataType & Document;

@Schema()
export class DataType {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  type: string;

  @ApiProperty()
  @Prop({ required: true })
  status: boolean;
}

export const DataTypeSchema = SchemaFactory.createForClass(DataType);
