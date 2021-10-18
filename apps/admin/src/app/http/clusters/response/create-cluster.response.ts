import { Prop } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import { ClusterDto } from 'libs/core/clusters/src/dtos/cluster.dto';
import * as mongoose from 'mongoose';
@ApiTags('Clusters')
export class createClusterResponse {
  @Prop({ required: true })
  name: string;

  @Prop()
  lead: mongoose.Types.ObjectId;

  static fromCluster(cluster: Cluster): createClusterResponse {
    const response = new createClusterResponse();
    response.name = cluster.name;
    response.lead = cluster.lead;
    return response;
  }
}
