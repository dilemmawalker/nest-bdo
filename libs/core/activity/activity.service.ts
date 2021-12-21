import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from '@shared/app/schemas/activity/activity.schema';
import { StoreRepository } from 'libs/core/stores/src/store.repository';
import { ActivityResponseDto } from 'apps/agent/src/app/http/activity/dtos/activity.response.dto';
import { ActivityRepository } from './activity.repository';
import { ActivityDto } from './dtos/activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async push(activityDto: ActivityDto): Promise<Activity> {
    return this.activityRepository.storeActivity(activityDto);
  }

  async getAllStores(storeId: string) {
    const store = await this.storeRepository.findOne(storeId);
    const activities = await this.activityRepository.findAll(storeId);
    return { store, activities };
  }
}
