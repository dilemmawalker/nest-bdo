import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Store } from '../../schemas/stores/store.schema';
import { StoreDto } from './dtos/store.dtos';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store.name) private StoreModel: Model<Store>) {}

  async create(storeDto: StoreDto): Promise<Store> {
    console.log(StoreDto.getStore(storeDto));
    const newStore = new this.StoreModel(StoreDto.getStore(storeDto));
    return await newStore.save();
  }
}
