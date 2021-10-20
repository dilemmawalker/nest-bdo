import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from '@shared/app/schemas/stores/store.schema';
import { Agent } from '@shared/app/schemas/users/agent.schema';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { FilterQuery, Model } from 'mongoose';
import { StoreDto } from './dtos/store.dtos';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    @InjectModel(Agent.name) private agentModel: Model<Agent>,
  ) {}

  async create(storeDto: StoreDto): Promise<Store> {
    const agent = await this.agentModel
      .findOne({ agentId: storeDto.agentId })
      .populate({
        path: 'cluster',
        model: 'Cluster',
        populate: {
          path: 'onboarding',
          model: 'Workflow',
        },
      });
    console.log(agent);
    storeDto.workflowKey = agent['cluster']['onboarding']['key'];
    storeDto.currentStepId =
      agent['cluster']['onboarding']['steps'][0]['stepId'];
    console.log(storeDto);
    const newStore = await new this.storeModel(
      StoreDto.getStore(storeDto),
    ).save();
    const stores = agent.stores || [];
    stores.push(newStore._id);
    console.log(agent);

    await agent.updateOne({
      stores: stores,
    });
    return await newStore;
  }

  async update(storeDto: StoreDto): Promise<Store> {
    const store = await this.storeModel.findOneAndUpdate(
      {
        $or: [{ storeId: storeDto.storeId }],
      },
      StoreDto.getStore(storeDto),
      {
        new: true,
      },
    );
    return await store;
  }

  async updateObj(obj: any, storeId: string): Promise<Store> {
    const store = await this.storeModel.findOneAndUpdate(
      {
        $or: [{ storeId: storeId }],
      },
      obj,
      {
        new: true,
      },
    );
    return await store;
  }

  async findOne(storeId: string): Promise<Store> {
    return await this.storeModel.findOne({ storeId });
  }
}
