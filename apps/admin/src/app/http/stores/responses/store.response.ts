import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { StepData, Store } from '@shared/app/schemas/stores/store.schema';
import { generateWorkflowUrl } from '@shared/app/utils/function/helper.function';
import * as moment from 'moment';

export class StoreResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  currentWorkflowUrl: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  static fromStore(store: Store) {
    const entity = new StoreResponse();
    entity.name = store.name;
    entity.mobile = store.mobile;
    entity.createdAt = moment(store.createdAt).format('MM/DD/YYYY');
    entity.updatedAt = moment(store.updatedAt).format('MM/DD/YYYY');
    entity.address = store.address;
    entity.currentWorkflowUrl = generateWorkflowUrl(
      store.workflowKey,
      store.currentStepId,
      store.storeId,
    );
    return entity;
  }

  static fromStoreArray(stores: any[], status: string): StoreResponse[] {
    const entities = [];
    stores.forEach((store) => {
      // entities.push(this.fromStore(store));
      if (store.status === status) {
        entities.push(this.fromStore(store));
      }
    });
    return entities;
  }
}
