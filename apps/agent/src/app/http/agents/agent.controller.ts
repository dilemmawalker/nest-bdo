import {
  Controller,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import {
  generateNextPageUrl,
  generatePreviousPageUrl,
} from '@shared/app/utils/function/helper.function';
import { StoreResponse } from 'apps/admin/src/app/http/stores/responses/store.response';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { ClusterManagerService } from 'libs/core/clusterManager/src/cluster.manager.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@ApiTags('Agents')
@Controller('agent')
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly jwtUtil: JWTUtil,
    private readonly clusterManagerService: ClusterManagerService,
  ) {}

  @Get('stores/:status')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [StoreResponse],
  })
  @ApiParam({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiParam({
    name: 'limit',
    type: Number,
    required: false,
  })
  async get(
    @Headers('Authorization') auth: string,
    @Param('status') status: string,
    @Param('page') page?: number,
    @Param('limit') limit?: number,
  ): Promise<any> {
    const json = this.jwtUtil.decode(auth);
    const page_number = page != null ? page : 1;
    const limit_count = limit != null ? limit : 20;
    const stores = json.clusterManagerId
      ? await this.clusterManagerService.getStores(
          json.clusterManagerId,
          page_number,
          limit_count,
        )
      : await this.agentService.getStores(
          json.agentId,
          page_number,
          limit_count,
        );
    const metaValue = new Map();
    metaValue.set('current_page', page_number);
    metaValue.set('limit', limit_count);
    metaValue.set('next_page', generateNextPageUrl(page_number, limit_count));
    metaValue.set(
      'prev_page',
      generatePreviousPageUrl(page_number, limit_count),
    );
    return ResponseUtils.success(
      StoreResponse.fromStoreArray(stores, status),
      status,
      // metaValue,
    );
  }
}
