import { Injectable } from '@nestjs/common';
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
}
