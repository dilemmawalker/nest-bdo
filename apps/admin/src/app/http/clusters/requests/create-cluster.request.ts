import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ClusterDto } from 'libs/core/clusters/src/dtos/cluster.dto';

@ApiTags('Clusters')
export class CreateClusterRequest {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  onboardingWorkflowKey: string;

  static getClusterDto(createClusterRequest: CreateClusterRequest): ClusterDto {
    const entity = new ClusterDto();
    entity.name = createClusterRequest.name;
    entity.onboardingWorkflowKey = createClusterRequest.onboardingWorkflowKey;
    return entity;
  }
}
