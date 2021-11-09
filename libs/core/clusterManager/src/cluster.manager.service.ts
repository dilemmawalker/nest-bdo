import { Injectable } from '@nestjs/common';
import { Store } from '@shared/app/schemas/stores/store.schema';
import {
  ClusterManager,
  ClusterManagerDto,
} from '@shared/app/schemas/users/cluster.manager.schema';
import { ClusterManagerRepository } from './cluster.manager.repository';

@Injectable()
export class ClusterManagerService {
  constructor(private clusterManagerRepository: ClusterManagerRepository) {}

  async update(clusterManagerDto: ClusterManagerDto): Promise<ClusterManager> {
    return await this.clusterManagerRepository.findOneAndUpdate(
      clusterManagerDto.clusterManagerId,
      clusterManagerDto,
    );
  }

  async findOne(userId: string): Promise<ClusterManager> {
    return await this.clusterManagerRepository.findOne({ userId });
  }

  async getStores(clusterManagerId: string): Promise<Store[]> {
    return await this.clusterManagerRepository.getStores({ clusterManagerId });
  }
}
