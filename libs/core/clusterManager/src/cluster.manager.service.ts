import { Injectable } from '@nestjs/common';
import { Store } from '@shared/app/schemas/stores/store.schema';
import {
  ClusterManager,
  ClusterManagerDto,
} from '@shared/app/schemas/users/cluster.manager.schema';
import { StoreRepository } from 'apps/admin/src/app/http/stores/store.repository';
import { ClusterManagerRepository } from './cluster.manager.repository';

@Injectable()
export class ClusterManagerService {
  constructor(
    private clusterManagerRepository: ClusterManagerRepository,
    private readonly storeRepository: StoreRepository,
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
  ): Promise<any> {
    return await this.storeRepository.updateObj({ status, remark }, storeId);
  }

  async getStores(clusterManagerId: string): Promise<Store[]> {
    return await this.clusterManagerRepository.getStores({ clusterManagerId });
  }
}
