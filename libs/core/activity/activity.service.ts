import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from '@shared/app/schemas/activity/activity.schema';
import { ActivityRepository } from './activity.repository';
import { ActivityDto } from './dtos/activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async activity(
    log_name: string,
    description: string,
    subject_type: string,
    subject_id: string,
    causer_type: string,
    causer_id: string,
    properties: string,
  ): Promise<Activity> {
    const newActivity = new ActivityDto();
    newActivity.log_name = log_name;
    newActivity.description = description;
    newActivity.subject_type = subject_type;
    newActivity.subject_id = subject_id;
    newActivity.causer_type = causer_type;
    newActivity.causer_id = causer_id;
    newActivity.properties = properties;
    newActivity.created_at = new Date(Date.now());

    return this.activityRepository.storeActivity(newActivity);

    return newActivity;
  }
}
