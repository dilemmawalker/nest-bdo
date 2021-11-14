import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  ClusterManager,
  ClusterManagerDto,
} from '@shared/app/schemas/users/cluster.manager.schema';

@ApiTags('ClusterManager')
export class ClusterManagerResponse extends ClusterManagerDto {
  static fromClusterManager(
    clusterManager: ClusterManager,
  ): ClusterManagerResponse {
    const clusterManagerResponse = new ClusterManagerResponse();
    clusterManagerResponse.active = clusterManager.active;
    clusterManagerResponse.clusters = clusterManager.clusters;
    clusterManagerResponse.clusterManagerId = clusterManager.clusterManagerId;
    return clusterManagerResponse;
  }

  static fromclusterManagerArray(
    clusterManagers: ClusterManager[],
  ): ClusterManagerResponse[] {
    const entities = [];
    clusterManagers.forEach((clusterManager) => {
      entities.push(this.fromClusterManager(clusterManager));
    });
    return entities;
  }
}
