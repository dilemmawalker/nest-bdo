import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ClusterManagerDto } from '@shared/app/schemas/users/cluster.manager.schema';

@ApiTags('ClusterManager')
export class UpdateClusterManagerRequest {
  @ApiProperty({ required: true })
  clusterManagerId: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  clusterNames: string[];

  static getClusterManagerDto(
    updateClusterManagerRequest: UpdateClusterManagerRequest,
  ): ClusterManagerDto {
    const entity = new ClusterManagerDto();
    entity.active = updateClusterManagerRequest.active;
    entity.clusterManagerId = updateClusterManagerRequest.clusterManagerId;
    entity.clusterNames = updateClusterManagerRequest.clusterNames;
    return entity;
  }
}
