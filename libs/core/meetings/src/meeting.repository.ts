import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meeting } from '@shared/app/schemas/meetings/meeting.schema';
import { FilterQuery, Model } from 'mongoose';
import { MeetingDto } from './dtos/meeting.dto';

@Injectable()
export class MeetingRepository {
  constructor(
    @InjectModel(Meeting.name) private readonly meetingModel: Model<Meeting>,
  ) {}

  async findOne(meetingId: string): Promise<Meeting> {
    return await this.meetingModel.findOne({ meetingId });
  }

  async create(meetingDto: MeetingDto): Promise<Meeting> {
    return await new this.meetingModel(meetingDto).save();
  }

  async findOneAndUpdate(
    meetingFilterQuery: FilterQuery<Meeting>,
    meeting: Partial<Meeting>,
  ): Promise<Meeting> {
    return await this.meetingModel.findOneAndUpdate(
      { meetingId: meetingFilterQuery.meetingId },
      meeting,
      {
        new: true,
      },
    );
  }
}
