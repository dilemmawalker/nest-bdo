import { ApiProperty } from '@nestjs/swagger';
import { Store } from '@shared/app/schemas/stores/store.schema';
import { generateWorkflowUrl } from '@shared/app/utils/function/helper.function';
import * as moment from 'moment';

export class StoreResponse {
  @ApiProperty()
  store_name: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  owner_name: string;

  @ApiProperty()
  currentWorkflowUrl: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  workflow: string;

  static fromStore(store: Store, status: string) {
    const entity = new StoreResponse();
    entity.store_name = store.storeName;
    entity.mobile = store.mobile;
    entity.createdAt = moment(store.createdAt).format('MM/DD/YYYY');
    entity.updatedAt = moment(store.updatedAt).format('MM/DD/YYYY');
    entity.owner_name = store.ownerName;
    entity.status = status;
    entity.storeId = store.storeId;
    entity.address = store.address;
    entity.workflow = store.workflowKey;
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
        entities.push(this.fromStore(store, status));
      }
    });
    return entities;
  }
}
