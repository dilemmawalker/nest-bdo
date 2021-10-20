import { ApiProperty } from '@nestjs/swagger';
import { StoreDto } from 'apps/admin/src/app/http/stores/dtos/store.dtos';

export class WorkflowRequestField {
  @ApiProperty()
  inputValue: any = '';

  @ApiProperty()
  keyName: string;

  @ApiProperty()
  groupKey: string;

  @ApiProperty()
  type: string;
}

export class WorkflowRequest {
  @ApiProperty({ type: [WorkflowRequestField] })
  fields: WorkflowRequestField[] = [];

  static getStoreDto(
    createStoreRequest: WorkflowRequest,
    workflowKey: string,
    stepId: string,
    storeId: string,
  ) {
    const storeDto = new StoreDto(workflowKey, stepId, storeId);
    createStoreRequest.fields.forEach((element) => {
      storeDto.fields.push(element);
    });
    return storeDto;
  }
}
