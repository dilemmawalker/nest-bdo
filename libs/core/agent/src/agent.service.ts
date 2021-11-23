import { Injectable } from '@nestjs/common';
import { Agent, AgentDto } from '@shared/app/schemas/users/agent.schema';
import { AgentRepository } from './agent.repository';

@Injectable()
export class AgentService {
  constructor(private readonly agentRepository: AgentRepository) {}

  async updateAgent(agentId: string, agentDto: AgentDto): Promise<any> {
    return await this.agentRepository.findOneAndUpdate({ agentId }, agentDto);
  }

  async getStores(agentId: string, page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;
    return await this.agentRepository.getStores(agentId, skip, limit);
  }

  async getAgents(): Promise<any[]> {
    return await this.agentRepository.getAll();
  }

  async findAgent(userId: string): Promise<Agent> {
    const agentDto = new AgentDto();
    agentDto.userId = userId;
    return await this.agentRepository.findOne(agentDto);
  }
}
