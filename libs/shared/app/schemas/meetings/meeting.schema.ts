import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseItemSchema } from '../base/base-Item.schema';
import * as mongoose from 'mongoose';
import { MeetingStatus } from '@shared/constant/meeting.constant';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting extends BaseItemSchema {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  meetingId: string;

  @Prop()
  remarks: string;

  @Prop()
  outcome: string;

  @Prop()
  description: string;

  @Prop()
  location: mongoose.Mixed;

  @Prop({ type: Date, required: true })
  scheduledAt: Date;

  @Prop({ type: Date })
  startedAt: Date;

  @Prop({ type: Date })
  endedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  store: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Agent' })
  agent: Types.ObjectId;

  @Prop({ enum: MeetingStatus, required: true })
  status: string;
}
export const MeetingSchema = SchemaFactory.createForClass(Meeting);
