import { ApiProperty } from '@nestjs/swagger';
import { Meeting } from '@shared/app/schemas/meetings/meeting.schema';
import * as mongoose from 'mongoose';

export class MeetingResponse {
  @ApiProperty()
  title: string;

  @ApiProperty()
  meetingId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  scheduledAt: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  location: any;

  @ApiProperty()
  store: mongoose.Types.ObjectId;

  @ApiProperty()
  agent: mongoose.Types.ObjectId;

  static fromMeeting(meeting: Meeting): MeetingResponse {
    const entity = new MeetingResponse();
    entity.title = meeting.title;
    entity.description = meeting.description;
    entity.scheduledAt = meeting.scheduledAt;
    entity.status = meeting.status;
    entity.store = meeting.store;
    entity.agent = meeting.agent;
    entity.location = meeting.location;
    entity.meetingId = meeting.meetingId;
    return entity;
  }

  static fromArray(meetings: Meeting[]): MeetingResponse[] {
    const entities = [];
    meetings.forEach((meeting) => {
      entities.push(this.fromMeeting(meeting));
    });
    return entities;
  }
}
