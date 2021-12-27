import { ApiProperty } from '@nestjs/swagger';
import { Store } from '@shared/app/schemas/stores/store.schema';
import { mapAddress } from '@shared/app/utils/function/dynamic.function';
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
  remark: string;

  @ApiProperty()
  address = '';

  @ApiProperty()
  status: string;

  @ApiProperty()
  agent: any;

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
    console.log('i');
    entity.remark = store.get('remark') || '';
    console.log('i o');
    entity.storeId = store.storeId;
    entity.address = mapAddress(store.get('store_address_pr'));
    entity.workflow = store.workflowKey;
    entity.currentWorkflowUrl = generateWorkflowUrl(
      store.workflowKey,
      store.currentStepId,
      store.storeId,
    );
    const agent = {};
    if (store.get('createdBy')) {
      agent['name'] = store.get('createdBy')['user']
        ? store.get('createdBy')['user']['name']
        : '';
      agent['agentId'] = store.get('createdBy')['agentId'];
    }
    entity.agent = agent;
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
