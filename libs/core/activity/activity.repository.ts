import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from '@shared/app/schemas/activity/activity.schema';
import { Model, FilterQuery } from 'mongoose';
import { ActivityDto } from './dtos/activity.dto';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
  ) {}

  async storeActivity(activityDto: ActivityDto): Promise<any> {
    const newActivity = new this.activityModel(activityDto);
    await newActivity.save();
    // return newActivity;
  }

  async findAll(subject_id: string): Promise<any> {
    return await this.activityModel
      .find({
        subject_id: subject_id,
      })
      .sort({ created_at: -1 });
  }
}
