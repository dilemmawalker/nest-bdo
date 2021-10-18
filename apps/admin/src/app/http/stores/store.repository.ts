import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from '@shared/app/schemas/stores/store.schema';
import { FilterQuery, Model } from 'mongoose';
import { StoreDto } from './dtos/store.dtos';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  async create(storeDto: StoreDto): Promise<Store> {
    const newStore = new this.storeModel(StoreDto.getStore(storeDto));
    return await newStore.save();
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
  async findOne(storeId: string): Promise<Store> {
    return await this.storeModel.findOne({ storeId });
  }
}
