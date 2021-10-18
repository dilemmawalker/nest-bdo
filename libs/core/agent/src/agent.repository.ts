import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDto } from '@shared/app/schemas/users/agent.schema';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class AgentRepository {
  constructor(
    @InjectModel(Agent.name) private agentModel: Model<Agent>,
    @InjectModel(Cluster.name) private clusterModel: Model<Cluster>,
  ) {}

  async findOne(agentFilterQuery: FilterQuery<Agent>): Promise<Agent> {
    return await this.agentModel.findOne({
      $or: [
        {
          agentId: agentFilterQuery.agentId,
        },
        {
          userId: agentFilterQuery.userId,
        },
      ],
    });
  }
  async findOneAndUpdate(
    agentFilterQuery: FilterQuery<Agent>,
    agentDto: AgentDto,
  ): Promise<Agent> {
    const cluster = await this.clusterModel.findOne({
      name: agentDto.clusterName,
    });
    if (cluster === null) {
      throw new NotFoundException();
    }
    agentDto.cluster = cluster._id;
    return await this.agentModel.findOneAndUpdate(
      { agentId: agentFilterQuery.agentId },
      agentDto,
      {
        new: true,
      },
    );
  }
}
