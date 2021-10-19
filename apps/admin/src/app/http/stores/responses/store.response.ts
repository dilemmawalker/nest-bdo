import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
<<<<<<< HEAD
import { StepData, Store } from '@shared/app/schemas/stores/store.schema';
import { User } from 'libs/shared/app/schemas/users/user.schema';
=======
=======
>>>>>>> 55b3bb4c821b6c515e5ab569bc235e9cc9fd582e
import { Role } from '@shared/app/schemas/users/roles.schema';
import { User } from 'libs/shared/app/schemas/users/user.schema';
import { StepData, Store } from '../../../schemas/stores/store.schema';
import * as mongoose from 'mongoose';
<<<<<<< HEAD
>>>>>>> 55b3bb4c821b6c515e5ab569bc235e9cc9fd582e
=======
>>>>>>> 55b3bb4c821b6c515e5ab569bc235e9cc9fd582e

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
