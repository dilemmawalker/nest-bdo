import { Injectable } from '@nestjs/common';
import { Store } from '@shared/app/schemas/stores/store.schema';
import {
  ClusterManager,
  ClusterManagerDto,
} from '@shared/app/schemas/users/cluster.manager.schema';
import { getCurrentDate } from '@shared/app/utils/function/helper.function';
import { StoreRepository } from 'libs/core/stores/src/store.repository';
import { ActivityService } from 'libs/core/activity/activity.service';
import { ActivityDto } from 'libs/core/activity/dtos/activity.dto';
import { ClusterManagerRepository } from './cluster.manager.repository';

@Injectable()
export class ClusterManagerService {
  constructor(
    private clusterManagerRepository: ClusterManagerRepository,
    private readonly storeRepository: StoreRepository,
    private readonly activityService: ActivityService,
  ) {}

  async update(clusterManagerDto: ClusterManagerDto): Promise<ClusterManager> {
    return await this.clusterManagerRepository.findOneAndUpdate(
      clusterManagerDto.clusterManagerId,
      clusterManagerDto,
    );
  }

  async findOne(userId: string): Promise<ClusterManager> {
    return await this.clusterManagerRepository.findOne({ userId });
  }

  async updateStatus(
    status: string,
    remark: string,
    storeId: string,
    refId: string,
    updatedBy: string,
  ): Promise<any> {
    const store = await this.storeRepository.updateObj(
      { status, remark },
      storeId,
    );

    await this.activityService.push(
      new ActivityDto(
        'Store',
        'status updated as ' + status,
        'Store',
        store.storeId,
        updatedBy,
        refId,
        '{}',
        getCurrentDate(),
      ),
    );
    return store;
  }

  async getStores(clusterManagerId: string): Promise<Store[]> {
    return await this.clusterManagerRepository.getStores({ clusterManagerId });
  }
}
