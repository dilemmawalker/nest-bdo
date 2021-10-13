import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Store } from '../../schemas/stores/store.schema';
import { StoreDto } from './dtos/store.dtos';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  async create(storeDto: StoreDto): Promise<Store> {
    console.log(StoreDto.getStore(storeDto));
    const newStore = new this.storeModel(StoreDto.getStore(storeDto));
    return await newStore.save();
  }

  async findOne(storeId: string): Promise<Store> {
    return await this.storeModel.findOne({ storeId });
  }
}
