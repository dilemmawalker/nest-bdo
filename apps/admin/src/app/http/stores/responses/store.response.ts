import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { StepData, Store } from '@shared/app/schemas/stores/store.schema';
import { User } from 'libs/shared/app/schemas/users/user.schema';

export class StoreResponse {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  attributes: StepData[];

  @ApiProperty()
  lead: StepData;

  static fromStore(store: Store) {
    const entity = new StoreResponse();
    entity.name = store.name;
    entity.mobile = store.mobile;
    return entity;
  }

  static fromStoreArray(stores: Store[]): StoreResponse[] {
    const entities = [];
    stores.forEach((store) => {
      entities.push(this.fromStore(store));
    });
    return entities;
  }
}
