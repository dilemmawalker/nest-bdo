import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FieldInputData } from '../../../schemas/stores/store.schema';
import { FieldData } from '../../workflow/requests/add-fields.request';
import { StoreDto } from '../dtos/store.dtos';

const NAME_KEY = 'name';
const MOBILE_KEY = 'mobile';

export class CreateStoreFieldData {
  @ApiProperty()
  inputValue: any;

  @ApiProperty()
  label: string;

  @ApiProperty()
  fieldId: string;

  @ApiProperty()
  keyName: string;
}

export class CreateStoreRequest {
  @ApiProperty({ type: [CreateStoreFieldData] })
  @IsNotEmpty()
  data: CreateStoreFieldData[];

  @ApiProperty()
  @IsNotEmpty()
  stepId: string;

  static getStoreDto(createStoreRequest: CreateStoreRequest) {
    const storeDto = new StoreDto();
    storeDto.lead.stepId = createStoreRequest.stepId;
    storeDto.lead.data = [];
    createStoreRequest.data.forEach((element) => {
      const fieldData = new FieldInputData();
      fieldData.label = element.label;
      fieldData.fieldId = element.fieldId;
      fieldData.inputValue = element.inputValue;
      fieldData.keyName = element.keyName;
      storeDto.lead.data.push(fieldData);
    });
    return storeDto;
  }
}
