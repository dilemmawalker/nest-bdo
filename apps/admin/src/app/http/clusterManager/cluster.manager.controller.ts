import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { ClusterManagerService } from 'libs/core/clusterManager/src/cluster.manager.service';
import { UpdateClusterManagerRequest } from './request/update-cluster-manager.request';
import { ClusterManagerResponse } from './response/cluster.manager.response';

@Controller('clusterManager')
@ApiTags('ClusterManager')
@ApiBearerAuth()
export class ClusterManagerController {
  constructor(private clusterManagerService: ClusterManagerService) {}

  @Post('update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClusterManagerResponse,
  })
  async update(
    @Body() updateClusterManagerRequest: UpdateClusterManagerRequest,
  ): Promise<any> {
    const updatedClusterManager = await this.clusterManagerService.update(
      UpdateClusterManagerRequest.getClusterManagerDto(
        updateClusterManagerRequest,
      ),
    );
    return ResponseUtils.success(
      ClusterManagerResponse.fromClusterManager(updatedClusterManager),
    );
  }
}
