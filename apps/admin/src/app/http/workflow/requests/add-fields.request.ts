import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FieldsDto } from '../dtos/fields.dto';

export class FieldData {
  @ApiProperty()
  label: string;

  @ApiProperty()
  options: any;

  position: number;

  @ApiProperty()
  dataType: string;
}

@ApiTags('Workflow')
export class AddFieldsRequest {
  @ApiProperty({ type: [FieldData] })
  @IsNotEmpty()
  fields: FieldData[];

  @ApiProperty()
  stepId: string;

  @ApiProperty()
  workflowKey: string;

  static getFieldsDto(addStepsRequest: AddFieldsRequest) {
    const fieldsDto = new FieldsDto();
    fieldsDto.workflowKey = addStepsRequest.workflowKey;
    fieldsDto.stepId = addStepsRequest.stepId;
    return fieldsDto;
  }
}
