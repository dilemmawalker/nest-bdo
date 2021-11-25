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

  async create(storeDto: StoreDto): Promise<any> {
    return await new this.storeModel(StoreDto.getStoreObj(storeDto)).save();
  }

  async update(storeDto: StoreDto): Promise<Store> {
    const store = await this.storeModel.findOneAndUpdate(
      {
        $or: [{ storeId: storeDto.storeId }],
      },
      StoreDto.getStoreObj(storeDto),
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

  async getStores(): Promise<Store[]> {
    return await this.storeModel.find({});
  }
}
