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
import { Roles } from 'apps/admin/src/app/decorators/auth/roles.decorators';
import { JwtAuthGuard } from 'apps/admin/src/app/guards/jwt-auth.guard';
import { RolesGuard } from 'apps/admin/src/app/guards/roles.guard';
import { StoreResponse } from 'apps/admin/src/app/http/stores/responses/store.response';
import { RoleConst } from 'apps/admin/src/constant/auth/roles.constant';
import { ClusterManagerService } from 'libs/core/clusterManager/src/cluster.manager.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UpdateStoreStatusRequest } from './request/update-store-status.request';

@ApiTags('ClusterManagers')
@Controller('cluster-manager')
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
export class ClusterManagerController {
  constructor(
    private readonly clusterManagerService: ClusterManagerService,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Post('store/update/:storeId')
  @Roles(RoleConst.ClusterManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [StoreResponse],
  })
  async updateStatus(
    @Headers('Authorization') auth: string,
    @Param('storeId') storeId: string,
    @Body() updateStoreStatusRequest: UpdateStoreStatusRequest,
  ): Promise<any> {
    const json = this.jwtUtil.decode(auth);
    await this.clusterManagerService.updateStatus(
      updateStoreStatusRequest.status,
      storeId,
    );
    return ResponseUtils.success({ status: updateStoreStatusRequest.status });
  }
}
