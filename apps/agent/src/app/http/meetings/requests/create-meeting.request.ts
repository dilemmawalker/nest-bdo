import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { MeetingDto } from 'libs/core/meetings/src/dtos/meeting.dto';

@ApiTags('Meetings')
export class CreateMeetingRequest {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: any;

  @ApiProperty({ type: Date, required: true })
  scheduledAt: Date;

  @ApiProperty({ required: true })
  storeId: string;

  @ApiProperty()
  meetingId: string;

  static getMeetingDto(
    createMeetingRequest: CreateMeetingRequest,
    agentId: string,
  ): MeetingDto {
    const entity = new MeetingDto();
    entity.agentId = agentId;
    entity.title = createMeetingRequest.title;
    entity.description = createMeetingRequest.description;
    entity.location = createMeetingRequest.description;
    entity.scheduledAt = createMeetingRequest.scheduledAt;
    entity.meetingId = createMeetingRequest.meetingId;
    entity.storeId = createMeetingRequest.storeId;
    return entity;
  }
}
