import { Injectable, NotFoundException } from '@nestjs/common';
import { Meeting } from '@shared/app/schemas/meetings/meeting.schema';
import { AgentRepository } from 'libs/core/agent/src/agent.repository';
import { MeetingRepository } from './meeting.repository';
import { v4 as uuidv4 } from 'uuid';
import { MeetingStatus } from '@shared/constant/meeting.constant';
import { ActivityDto } from 'libs/core/activity/dtos/activity.dto';
import { ActivityService } from 'libs/core/activity/activity.service';
import { getCurrentDate } from '@shared/app/utils/function/helper.function';
import { StoreService } from 'libs/core/stores/src/store.service';
import { MeetingDto } from './dtos/meeting.dto';

@Injectable()
export class MeetingService {
  constructor(
    private readonly meetingRepository: MeetingRepository,
    private readonly agentRepository: AgentRepository,
    private readonly activityService: ActivityService,
    private readonly storeService: StoreService,
  ) {}

  async createOrUpdate(meetingDto: MeetingDto): Promise<Meeting> {
    if (meetingDto.meetingId) {
      return await this.update(meetingDto);
    }
    return await this.create(meetingDto);
  }

  private async create(meetingDto: MeetingDto): Promise<Meeting> {
    const agent = await this.agentRepository.getAgent(meetingDto.agentId);
    const store = await this.storeService.findOne(meetingDto.storeId);
    if (!agent || !store) {
      throw new NotFoundException();
    }
    meetingDto.agent = agent._id;
    meetingDto.store = store._id;
    meetingDto = this.populateDatainMeetingDto(meetingDto);
    const meeting = await this.meetingRepository.create(meetingDto);
    if (!agent.meetings) {
      agent.meetings = [];
    }
    agent.meetings.push(meeting._id);
    if (!store.meetings) {
      store.meetings = [];
    }
    store.meetings.push(meeting._id);
    await this.agentRepository.updateObj(
      { meetings: agent.meetings },
      meetingDto.agentId,
    );
    await this.storeService.updateStore(
      {
        meetings: store.meetings,
      },
      meetingDto.storeId,
    );
    await this.pushActivity(meeting.meetingId, meetingDto.agentId, 'Created');
    return meeting;
  }

  private populateDatainMeetingDto(meetingDto: MeetingDto): MeetingDto {
    meetingDto.createdAt = new Date();
    meetingDto.updatedAt = new Date();
    meetingDto.meetingId = uuidv4();
    meetingDto.status = MeetingStatus.upcoming;
    return meetingDto;
  }

  private async update(meetingDto: MeetingDto): Promise<Meeting> {
    meetingDto.updatedAt = new Date();
    const meeting = await this.meetingRepository.findOneAndUpdate(
      { meetingId: meetingDto.meetingId },
      meetingDto,
    );
    await this.pushActivity(meeting.meetingId, meetingDto.agentId, 'Updated');
    return meeting;
  }

  private async pushActivity(
    meetingId: string,
    agentId: string,
    action: string,
  ) {
    await this.activityService.push(
      new ActivityDto(
        'Meeting',
        action,
        'Meeting',
        meetingId,
        'Agent',
        agentId,
        '{}',
        getCurrentDate(),
      ),
    );
  }
}
