import { Injectable } from '@nestjs/common';
import {
  Meeting,
  MeetingDto,
} from '@shared/app/schemas/meetings/meeting.schema';
import { AgentRepository } from 'libs/core/agent/src/agent.repository';
import { MeetingRepository } from './meeting.repository';
import { v4 as uuidv4 } from 'uuid';
import { MeetingStatus } from '@shared/constant/meeting.constant';

@Injectable()
export class MeetingService {
  constructor(
    private readonly meetingRepository: MeetingRepository,
    private readonly agentRepository: AgentRepository,
  ) {}

  async createOrUpdate(meetingDto: MeetingDto): Promise<Meeting> {
    if (meetingDto.meetingId) {
      return await this.update(meetingDto);
    }
    return await this.create(meetingDto);
  }

  async create(meetingDto: MeetingDto): Promise<Meeting> {
    const agent = await this.agentRepository.getAgent(meetingDto.agentId);
    meetingDto.agent = agent._id;
    const meeting = await this.meetingRepository.create(meetingDto);
    agent.meetings.push(meeting._id);
    return meeting;
  }

  populateDatainMeetingDto(meetingDto: MeetingDto): MeetingDto {
    meetingDto.createdAt = new Date();
    meetingDto.updatedAt = new Date();
    meetingDto.meetingId = uuidv4();
    meetingDto.status = MeetingStatus.upcoming;
    return meetingDto;
  }

  async update(meetingDto: MeetingDto): Promise<Meeting> {
    meetingDto.updatedAt = new Date();
    return await this.meetingRepository.create(meetingDto);
  }
}
