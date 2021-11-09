import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UpdateAgentRequest } from './request/update-agent.request';
import { AgentResponse } from './response/agent.response';

@ApiTags('Agent')
@Controller('agent')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [AgentResponse],
  })
  @Get()
  async getUsers(): Promise<any> {
    const obj = await this.agentService.getAgents();
    // return ResponseUtils.success(obj);
    return ResponseUtils.success(AgentResponse.fromAgentArray(obj));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @Post('update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: AgentResponse,
  })
  async updateAgent(
    @Body() updateAgentRequest: UpdateAgentRequest,
  ): Promise<any> {
    const obj = await this.agentService.updateAgent(
      updateAgentRequest.agentId,
      UpdateAgentRequest.getAgentDto(updateAgentRequest),
    );
    return ResponseUtils.success(AgentResponse.fromAgent(obj));
  }
}
