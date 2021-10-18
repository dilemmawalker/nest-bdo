import { ClusterDto } from '@core/clusters/dtos/cluster.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Clusters')
export class UpdateClusterRequest {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  onboardingWorkflowKey: string;

  static getClusterDto(updateClusterRequest: UpdateClusterRequest): ClusterDto {
    const clusterDto = new ClusterDto();
    clusterDto.name = updateClusterRequest.name;
    clusterDto.onboardingWorkflowKey =
      updateClusterRequest.onboardingWorkflowKey;
    return clusterDto;
  }
}
