import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Field } from '../../../schemas/fields/field.schema';
import { FieldsDto } from '../dtos/fields.dto';

@ApiTags('Workflow')
export class AddFieldsRequest {
  @ApiProperty({ type: [Field] })
  @IsNotEmpty()
  fields: Field[];

  @ApiProperty()
  stepId: string;

  @ApiProperty()
  key: string;

  static getFieldsDto(addStepsRequest: AddFieldsRequest) {
    const fieldsDto = new FieldsDto();
    fieldsDto.key = addStepsRequest.key;
    fieldsDto.stepId = addStepsRequest.stepId;
    fieldsDto.fields = addStepsRequest.fields;
    return fieldsDto;
  }
}
