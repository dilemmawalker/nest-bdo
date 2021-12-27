import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from '@shared/app/schemas/stores/store.schema';
import { Agent } from '@shared/app/schemas/users/agent.schema';
import {
  ClusterManager,
  ClusterManagerDto,
} from '@shared/app/schemas/users/cluster.manager.schema';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ClusterManagerRepository {
  constructor(
    @InjectModel(ClusterManager.name)
    private clusterManagerModel: Model<ClusterManager>,
    @InjectModel(Cluster.name)
    private clusterModel: Model<Cluster>,
    @InjectModel(Agent.name)
    private agentModel: Model<Agent>,
  ) {}

  async findOneAndUpdate(
    clusterManagerId: string,
    clusterManagerDto: ClusterManagerDto,
  ): Promise<ClusterManager> {
    const clusters = await this.clusterModel.find({
      name: { $in: clusterManagerDto.clusterNames },
    });
    clusterManagerDto.clusters = [];
    clusters.forEach((cluster) => {
      clusterManagerDto.clusters.push(cluster._id);
    });
    return await this.clusterManagerModel.findOneAndUpdate(
      {
        clusterManagerId,
      },
      {
        $addToSet: { clusters: { $each: clusterManagerDto.clusters } },
        active: clusterManagerDto.active,
      },
      {
        new: true,
      },
    );
  }

  async findOne(
    clusterManagerFilterQuery: FilterQuery<ClusterManager>,
  ): Promise<ClusterManager> {
    return await this.clusterManagerModel.findOne({
      $or: [
        {
          userId: clusterManagerFilterQuery.userId,
        },
        {
          clusterManagerId: clusterManagerFilterQuery.clusterManagerId,
        },
      ],
    });
  }

  async updateObj(obj: any, clusterManagerId: string): Promise<any> {
    const clusterManager = await this.clusterManagerModel.findOneAndUpdate(
      { clusterManagerId },
      obj,
    );
    return await this.findOne({ clusterManagerId });
  }

  async getStores(
    clusterManagerFilterQuery: FilterQuery<ClusterManager>,
  ): Promise<any> {
    const clusterManager = await this.clusterManagerModel.findOne({
      clusterManagerId: clusterManagerFilterQuery.clusterManagerId,
    });
    const agents = await this.agentModel
      .find({
        cluster: { $in: clusterManager.clusters },
      })
      .populate({
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
      })
      .sort({ createdAt: -1 });
    return agents
      .flatMap((agent) => {
        return agent.stores;
      })
      .sort((a, b) => b['createdAt'] - a['createdAt']);
=======
      });
    const stores = agents.flatMap((agent) => {
      return agent.stores;
    });
    return stores;
  }
}
