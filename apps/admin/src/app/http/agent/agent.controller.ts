import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { UpdateAgentRequest } from './request/update-agent.request';
import { AgentResponse } from './response/agent.response';

@ApiTags('Agent')
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}
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
