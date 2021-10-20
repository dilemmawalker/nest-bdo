import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { StoreResponse } from 'apps/admin/src/app/http/stores/responses/store.response';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@ApiTags('Agents')
@Controller('agent')
@ApiBearerAuth()
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Get('stores/:status')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [StoreResponse],
  })
  async get(
    @Headers('Authorization') auth: string,
    @Param('status') status: string,
  ): Promise<any> {
    const json = await this.jwtUtil.decode(auth);
    const stores = await this.agentService.getStores(json.agentId);
    return ResponseUtils.success(StoreResponse.fromStoreArray(stores, status));
  }
}
