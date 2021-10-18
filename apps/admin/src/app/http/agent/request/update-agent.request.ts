import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AgentDto } from '@shared/app/schemas/users/agent.schema';
import { Types } from 'mongoose';

@ApiTags('Agents')
export class UpdateAgentRequest {
  @ApiProperty()
  agentId: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  clusterName: string;

  static getAgentDto(updateAgentRequest: UpdateAgentRequest): AgentDto {
    const agentDto = new AgentDto();
    agentDto.active = updateAgentRequest.active;
    agentDto.clusterName = updateAgentRequest.clusterName;
    return agentDto;
  }
}
