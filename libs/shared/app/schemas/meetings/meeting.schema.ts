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
  location: any;

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

  @Prop({ required: true })
  status: MeetingStatus;
}

export class MeetingDto {
  title: string;
  meetingId: string;
  agentId: string;
  remarks: string;
  outcome: string;
  description: string;
  location: any;
  scheduledAt: Date;
  startedAt: Date;
  endedAt: Date;
  store: Types.ObjectId;
  agent: Types.ObjectId;
  status: MeetingStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const MeetingSchema = SchemaFactory.createForClass(Meeting);
