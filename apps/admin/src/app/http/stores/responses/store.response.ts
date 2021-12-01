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
  mobile = '';

  @ApiProperty()
  owner_name: string;

  @ApiProperty()
  currentWorkflowUrl: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  address = '';

  @ApiProperty()
  status: string;

  @ApiProperty()
  workflow: string;

  static fromStore(store: any, status: string) {
    const { store_address } = store;
    const entity = new StoreResponse();
    entity.store_name = store.store_name;
    entity.mobile = store.mobile || '';
    entity.createdAt = moment(store.createdAt).format('MM/DD/YYYY');
    entity.updatedAt = moment(store.updatedAt).format('MM/DD/YYYY');
    entity.owner_name = store.owner_name;
    entity.status = status;
    entity.storeId = store.storeId;
    entity.address = store.store_address
      ? `${store_address['address']}, ${store_address['landmark']}, ${store_address['town']}, ${store_address['tehsil']}`
      : '';
    entity.workflow = store.workflowKey;
    entity.currentWorkflowUrl = generateWorkflowUrl(
      store.workflowKey,
      store.currentStepId,
      store.storeId,
    );

    return entity;
  }

  static fromStoreArray(
    stores: any[],
    status: string,
    page: number,
    limit: number,
  ): StoreResponse[] {
    const entities = [];
    const skip = (page - 1) * limit;
    stores.forEach((store) => {
      if (status == 'any') {
        entities.push(this.fromStore(store, store.status));
      } else if (store.status === status) {
        entities.push(this.fromStore(store, status));
      }
    });
    if (page == -1 || limit == -1) return entities;
    return entities.slice(skip, skip + limit);
  }
}
