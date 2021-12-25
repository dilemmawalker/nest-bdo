import {
  ConsoleLogger,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Param,
  UnauthorizedException,
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
import { AgentService } from 'libs/core/agent/src/agent.service';
import { ClusterManagerService } from 'libs/core/clusterManager/src/cluster.manager.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { MeetingResponse } from '../meetings/responses/meeting.response';

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
  @ApiResponse({
    status: HttpStatus.OK,
    type: [StoreResponse],
  })
  async get(
    @Headers('Authorization') auth: string,
    @Param('status') status: string,
  ): Promise<any> {
    const json = this.jwtUtil.decode(auth);
    const stores = json.clusterManagerId
      ? await this.clusterManagerService.getStores(json.clusterManagerId)
      : await this.agentService.getStores(json.agentId);
    return ResponseUtils.success(
      StoreResponse.fromStoreArray(stores, status),
      status,
    );
  }

  @Get('meetings')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [MeetingResponse],
  })
  async getMeetings(@Headers('Authorization') auth: string): Promise<any> {
    const json = this.jwtUtil.decode(auth);
    const meetings = await this.agentService.getMeetings(json.agentId);
    return ResponseUtils.success(MeetingResponse.fromArray(meetings));
  }
}
