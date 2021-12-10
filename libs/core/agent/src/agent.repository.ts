import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDto } from '@shared/app/schemas/users/agent.schema';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import { User } from '@shared/app/schemas/users/user.schema';
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

  async updateObj(obj: any, agentId: string) {
    return this.agentModel.findOneAndUpdate({ agentId }, obj);
  }

  async getAgent(agentId: string): Promise<Agent> {
    return await this.agentModel.findOne({ agentId }).populate({
      path: 'cluster',
      model: 'Cluster',
      populate: {
        path: 'onboarding',
        model: 'Workflow',
      },
    });
  }

  async getAll(): Promise<any[]> {
    return await this.agentModel
      .find({})
      .populate({
        path: 'cluster',
        model: 'Cluster',
      })
      .populate({
        path: 'user',
        model: 'User',
      });
  }

  async getStores(agentId: string): Promise<any> {
    const agent = await this.agentModel.findOne({ agentId: agentId }).populate({
      path: 'stores',
      model: 'Store',
      populate: {
        path: 'createdBy',
        model: 'Agent',
        populate: {
          path: 'user',
          model: 'User',
        },
      },
    });
    return agent['stores'].sort((a, b) => b['createdAt'] - a['createdAt']);
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
    const agent = await this.agentModel.findOneAndUpdate(
      { agentId: agentFilterQuery.agentId },
      agentDto,
      {
        new: true,
      },
    );
    return (
      await agent.populate({
        path: 'cluster',
        model: 'Cluster',
      })
    ).populate({
      path: 'user',
      model: 'User',
    });
  }
}
