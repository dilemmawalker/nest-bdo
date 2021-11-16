import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

import * as mongoose from 'mongoose';
export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  log_name: string;

  @Prop()
  description: string;

  @Prop()
  subject_type: string;

  @Prop()
  subject_id: string;

  @Prop()
  causer_type: string;

  @Prop()
  causer_id: string;

  @Prop()
  properties: string;

  @Prop()
  created_at: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
