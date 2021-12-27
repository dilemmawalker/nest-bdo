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
  store: any;

  @ApiProperty()
  agent: any;

  static fromMeeting(meeting: any, store = null): MeetingResponse {
    const storeObj = store || meeting.get('store');
    const entity = new MeetingResponse();
    entity.title = meeting.title;
    entity.description = meeting.description;
    entity.scheduledAt = meeting.scheduledAt;
    entity.status = meeting.status;
    entity.store = {
      owner_name: storeObj.owner_name,
      store_name: storeObj.store_name,
      storeId: storeObj.store_id,
    };
    entity.agent = {
      agent_name: storeObj.get('agent_name') || '',
      agent_id: storeObj.get('agent_id') || '',
    };
    entity.location = meeting.location;
    entity.meetingId = meeting.meetingId;
    return entity;
  }

  static fromArray(meetings: any[] = [], store = null): MeetingResponse[] {
    const entities = [];
    console.log(meetings);
    meetings.forEach((meeting) => {
      entities.push(this.fromMeeting(meeting, store));
    });
    return entities;
  }
}
