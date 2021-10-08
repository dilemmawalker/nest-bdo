import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Store } from '../../schemas/stores/store.schema';
import { StoreDto } from './dtos/store.dtos';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store.name) private StoreModel: Model<Store>) {}

  async create(StoreDto: StoreDto): Promise<Store> {
    const newStore = new this.StoreModel(StoreDto);
    return await newStore.save();
  }
}
