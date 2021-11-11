import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from '@shared/app/schemas/Activity/Activity.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private notifModel: Model<Activity>,
  ) {}

  async activity(
    log_name: string,
    description: string,
    subject_type: string,
    subject_id: string,
    causer_type: string,
    causer_id: string,
    properties: string,
  ): Promise<Activity> {
    const newActivity = new this.notifModel();
    newActivity.log_name = log_name;
    newActivity.description = description;
    newActivity.subject_type = subject_type;
    newActivity.subject_id = subject_id;
    newActivity.causer_type = causer_type;
    newActivity.causer_id = causer_id;
    newActivity.properties = properties;
    newActivity.created_at = new Date(Date.now());

    return newActivity;
  }
}
