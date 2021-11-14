import { ApiTags } from '@nestjs/swagger';
import { Agent, AgentDto } from '@shared/app/schemas/users/agent.schema';
import { User } from '@shared/app/schemas/users/user.schema';
import { agent } from 'supertest';

@ApiTags('Agent')
export class AgentResponse {
  agentId: string;

  userId: string;

  active: boolean;

  name: string;

  clusterName = '';

  static fromAgent(agent: any): AgentResponse {
    console.log(agent);
    const agentResponse = new AgentResponse();
    agentResponse.active = agent.active;
    agentResponse.agentId = agent.agentId;
    if (agent.get('user')) {
      agentResponse.name = agent.get('user').name;
    }
    agentResponse.name = agent.get('user').name;
    if (agent.get('cluster')) {
      agentResponse.clusterName = agent.get('cluster').name;
    }
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
