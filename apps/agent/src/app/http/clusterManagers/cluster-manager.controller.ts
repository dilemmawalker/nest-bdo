import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { BasicResponse } from '@shared/app/utils/request/basic.response';
import { Roles } from 'apps/admin/src/app/decorators/auth/roles.decorators';
import { JwtAuthGuard } from 'apps/admin/src/app/guards/jwt-auth.guard';
import { RolesGuard } from 'apps/admin/src/app/guards/roles.guard';
import { StoreResponse } from 'apps/admin/src/app/http/stores/responses/store.response';
import { StoreService } from 'apps/admin/src/app/http/stores/store.service';
import { RoleConst } from 'apps/admin/src/constant/auth/roles.constant';
import { ClusterManagerService } from 'libs/core/clusterManager/src/cluster.manager.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { STATUS_UPDATE_SUCCESS } from './constant/cluster-manager.constant';
import { UpdateStoreStatusRequest } from './request/update-store-status.request';

@ApiTags('ClusterManagers')
@Controller('cluster-manager')
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
export class ClusterManagerController {
  constructor(
    private readonly clusterManagerService: ClusterManagerService,
    private readonly storeService: StoreService,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Post('store/update/:storeId')
  @Roles(RoleConst.ClusterManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BasicResponse,
  })
  async updateStatus(
    @Headers('Authorization') auth: string,
    @Param('storeId') storeId: string,
    @Body() updateStoreStatusRequest: UpdateStoreStatusRequest,
  ): Promise<any> {
    const json = this.jwtUtil.decode(auth);
    const refId =
      updateStoreStatusRequest.updatedBy == 'Agent'
        ? json.agentId
        : json.clusterManagerId;
    await this.clusterManagerService.updateStatus(
      updateStoreStatusRequest.status,
      updateStoreStatusRequest.reason,
      storeId,
      refId,
      updateStoreStatusRequest.updatedBy,
    );
    const store = await this.storeService.findOne(storeId);
    return ResponseUtils.success(
      StoreResponse.fromStore(store, updateStoreStatusRequest.status),
      STATUS_UPDATE_SUCCESS,
    );
  }
}
