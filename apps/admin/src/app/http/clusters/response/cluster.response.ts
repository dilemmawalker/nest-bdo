import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import cluster from 'cluster';
import { ClusterDto } from 'libs/core/clusters/src/dtos/cluster.dto';
import * as mongoose from 'mongoose';

@ApiTags('Clusters')
export class ClusterResponse {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  onboarding: mongoose.Types.ObjectId;

  static fromCluster(cluster: Cluster): ClusterResponse {
    const response = new ClusterResponse();
    response.name = cluster.name;
    response.onboarding = cluster.onboarding;
    return response;
  }

  static fromClusterArray(clusters: Cluster[]): ClusterResponse[] {
    const entity: ClusterResponse[] = [];
    clusters.forEach((cluster) => {
      entity.push(this.fromCluster(cluster));
    });
    return entity;
  }
}
