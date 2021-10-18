import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import { FilterQuery, Model } from 'mongoose';
import { ClusterDto } from './dtos/cluster.dto';

@Injectable()
export class ClusterRepository {
  constructor(
    @InjectModel(Cluster.name) private clusterModel: Model<Cluster>,
  ) {}

  async findOne(clusterFilterQuery: FilterQuery<Cluster>): Promise<Cluster> {
    return await this.clusterModel.findOne({ name: clusterFilterQuery.name });
  }

  async find(): Promise<Cluster[]> {
    return await this.clusterModel.find({});
  }

  async create(clusterDto: ClusterDto): Promise<Cluster> {
    const newCluster = new this.clusterModel(clusterDto);
    await newCluster.save();
    return newCluster;
  }

  async findOneAndUpdate(
    roleFilterQuery: FilterQuery<Cluster>,
    cluster: Partial<Cluster>,
  ): Promise<Cluster> {
    return await this.clusterModel.findOneAndUpdate(
      { name: roleFilterQuery.name },
      cluster,
      {
        new: true,
      },
    );
  }
}
