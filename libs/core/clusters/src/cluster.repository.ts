import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import { Workflow } from 'apps/admin/src/app/schemas/workflows/workflow.schema';
import { FilterQuery, Model } from 'mongoose';
import { ClusterDto } from './dtos/cluster.dto';

@Injectable()
export class ClusterRepository {
  constructor(
    @InjectModel(Cluster.name) private clusterModel: Model<Cluster>,
    @InjectModel(Workflow.name) private workflowModel: Model<Workflow>,
  ) {}

  async findOne(clusterFilterQuery: FilterQuery<Cluster>): Promise<Cluster> {
    return await this.clusterModel.findOne({ name: clusterFilterQuery.name });
  }

  async find(): Promise<Cluster[]> {
    return await this.clusterModel.find({});
  }

  async create(clusterDto: ClusterDto): Promise<Cluster> {
    const workflow = await this.workflowModel.findOne({
      key: clusterDto.onboardingWorkflowKey,
    });
    if (workflow === null) {
      throw new NotFoundException();
    }
    clusterDto.onboarding = workflow._id;
    const newCluster = new this.clusterModel(clusterDto);
    await newCluster.save();
    return newCluster;
  }

  async findOneAndUpdate(
    roleFilterQuery: FilterQuery<Cluster>,
    clusterDto: ClusterDto,
  ): Promise<Cluster> {
    const workflow = await this.workflowModel.findOne({
      key: clusterDto.onboardingWorkflowKey,
    });
    if (workflow === null) {
      throw new NotFoundException();
    }
    clusterDto.onboarding = workflow._id;
    return await this.clusterModel.findOneAndUpdate(
      { name: roleFilterQuery.name },
      clusterDto,
      {
        new: true,
      },
    );
  }
}
