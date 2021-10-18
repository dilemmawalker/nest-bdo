import { Prop } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ClusterDto } from 'libs/core/clusters/src/dtos/cluster.dto';

@ApiTags('Clusters')
export class CreateClusterRequest {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  leadWorkflowId: string;

  static getClusterDto(createClusterRequest: CreateClusterRequest): ClusterDto {
    const entity = new ClusterDto();
    entity.name = createClusterRequest.name;
    entity.lead = new mongoose.Types.ObjectId(
      createClusterRequest.leadWorkflowId,
    );
    return entity;
  }
}
