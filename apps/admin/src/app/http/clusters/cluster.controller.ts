import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { ClusterService } from 'libs/core/clusters/src/cluster.service';
import { CreateClusterRequest } from './requests/create-cluster.request';
import { UpdateClusterRequest } from './requests/update-cluster.request';
import { ClusterResponse } from './response/cluster.response';

@ApiTags('Clusters')
@Controller('clusters')
@ApiBearerAuth()
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Post()
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClusterResponse,
  })
  async createCluster(
    @Body()
    createClusterRequest: CreateClusterRequest,
  ): Promise<any> {
    const cluster = await this.clusterService.createCluster(
      CreateClusterRequest.getClusterDto(createClusterRequest),
    );
    return ResponseUtils.success(ClusterResponse.fromCluster(cluster));
  }

  @Post('update')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClusterResponse,
  })
  async updateCluster(
    @Body() updateClusterRequest: UpdateClusterRequest,
  ): Promise<any> {
    const updatedCluster = await this.clusterService.updateCluster(
      updateClusterRequest.name,
      UpdateClusterRequest.getClusterDto(updateClusterRequest),
    );
    return ResponseUtils.success(ClusterResponse.fromCluster(updatedCluster));
  }

  @Get('all')
  async getClusters(): Promise<any> {
    const clusters = await this.clusterService.getClusters();
    return ResponseUtils.success(ClusterResponse.fromClusterArray(clusters));
  }
}
