import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
}
