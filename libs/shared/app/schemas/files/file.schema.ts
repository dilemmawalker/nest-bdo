import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed, Types } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  keyName: string;

  @ApiProperty()
  @Prop()
  isTemp: boolean;

  @ApiProperty()
  @Prop()
  url: string;

  @ApiProperty()
  @Prop()
  type: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
