import { MeetingStatus } from '@shared/constant/meeting.constant';
import { Types } from 'mongoose';

export class MeetingDto {
  title: string;
  meetingId: string;
  agentId: string;
  storeId: string;
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
