import { ApiTags } from '@nestjs/swagger';
import { Agent, AgentDto } from '@shared/app/schemas/users/agent.schema';

@ApiTags('Agent')
export class AgentResponse extends AgentDto {
  static fromAgent(agent: Agent): AgentResponse {
    const agentResponse = new AgentResponse();
    agentResponse.active = agent.active;
    agentResponse.cluster = agent.cluster;
    agentResponse.agentId = agent.agentId;
    return agentResponse;
  }

  static fromAgentArray(agents: Agent[]): AgentResponse[] {
    const entities = [];
    agents.forEach((agent) => {
      entities.push(this.fromAgent(agent));
    });
    return entities;
  }
}
