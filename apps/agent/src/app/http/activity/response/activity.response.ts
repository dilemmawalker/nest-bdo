import { Activity } from '@shared/app/schemas/activity/activity.schema';
import {
  getFormattedDate,
  getFormattedTime,
} from '@shared/app/utils/function/helper.function';

export class ActivityResponse {
  id: string;
  activity: string;
  date: string;
  time: string;

  static fromActivity(activity: Activity, storeName: string) {
    const entity = new ActivityResponse();
    const date = new Date(activity.created_at.getTime());
    entity.id = activity._id.toString();
    entity.date = getFormattedDate(date);
    entity.time = getFormattedTime(date);
    entity.activity = `${storeName} - Lead ${activity.description.toLowerCase()} by agent`;
    return entity;
  }

  static fromActivityArray(
    activities: Activity[],
    storeName: string,
  ): ActivityResponse[] {
    const entities = [];
    activities.forEach((activity) => {
      entities.push(this.fromActivity(activity, storeName));
    });
    return entities;
  }
}
