import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FieldData } from '../../../schemas/stores/store.schema';
import { StoreDto } from '../dtos/store.dtos';

const NAME_KEY = 'name';
const MOBILE_KEY = 'mobile';

export class CreateStoreFieldData {
  @ApiProperty()
  inputValue: any;

  @ApiProperty()
  name: string;

  @ApiProperty()
  fieldId: string;
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
    storeDto.lead.data = {};
    createStoreRequest.data.forEach((element) => {
      const fieldData = new FieldData();
      fieldData.name = element.name;
      fieldData.fieldId = element.fieldId;
      fieldData.inputValue = element.inputValue;
      storeDto.lead.data[fieldData.name] = fieldData;
    });

    storeDto.name = storeDto.lead.data[NAME_KEY].inputValue;
    storeDto.name = storeDto.lead.data[MOBILE_KEY].inputValue;
    return storeDto;
  }
}
