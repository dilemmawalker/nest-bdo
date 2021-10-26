import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { StoreResponse } from '../stores/responses/store.response';
import { UpdateAgentRequest } from './request/update-agent.request';
import { AgentResponse } from './response/agent.response';

@ApiTags('Agent')
@Controller('agent')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private readonly jwtUtil: JWTUtil,
  ) {}
  @Post('update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: AgentResponse,
  })
  async updateAgent(
    @Body() updateAgentRequest: UpdateAgentRequest,
  ): Promise<any> {
    const updatedAgent = await this.agentService.updateAgent(
      updateAgentRequest.agentId,
      UpdateAgentRequest.getAgentDto(updateAgentRequest),
    );
    return ResponseUtils.success(AgentResponse.fromAgent(updatedAgent));
  }
}
