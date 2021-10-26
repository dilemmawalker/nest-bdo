import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
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

  @ApiProperty()
  position = 0;

  @ApiProperty()
  isGroup: boolean;

  @ApiProperty()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'File' })
  groups: Types.ObjectId[] = [];

  @ApiProperty()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Validation' })
  validations: Types.ObjectId[] = [];

  @ApiProperty()
  @Prop({ required: true })
  type: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
