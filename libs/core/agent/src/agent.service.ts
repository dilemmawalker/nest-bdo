import { Injectable } from '@nestjs/common';
import { Agent, AgentDto } from '@shared/app/schemas/users/agent.schema';
import { AgentRepository } from './agent.repository';

@Injectable()
export class AgentService {
  constructor(private readonly agentRepository: AgentRepository) {}

  async updateAgent(agentId: string, agentDto: AgentDto): Promise<Agent> {
    return await this.agentRepository.findOneAndUpdate({ agentId }, agentDto);
  }

  async getStores(agentId: string): Promise<any> {
    return await this.agentRepository.getStores(agentId);
  }

  async getAgents(): Promise<Agent[]> {
    return await this.agentRepository.getAll();
  }

  async findAgent(userId: string): Promise<Agent> {
    const agentDto = new AgentDto();
    agentDto.userId = userId;
    return await this.agentRepository.findOne(agentDto);
  }
}
