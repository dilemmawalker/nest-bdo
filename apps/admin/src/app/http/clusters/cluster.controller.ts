import { Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { ClusterService } from 'libs/core/clusters/src/cluster.service';
import { CreateClusterRequest } from './requests/create-cluster.request';
import { createClusterResponse } from './response/create-cluster.response';

@ApiTags('Clusters')
@Controller('clusters')
@ApiBearerAuth()
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Post('create')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: createClusterResponse,
  })
  async createCluster(
    createClusterRequest: CreateClusterRequest,
  ): Promise<any> {
    const cluster = await this.clusterService.createCluster(
      CreateClusterRequest.getClusterDto(createClusterRequest),
    );
    return ResponseUtils.success(createClusterResponse.fromCluster(cluster));
  }
}
