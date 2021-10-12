import { ApiTags } from '@nestjs/swagger';
import { FieldData } from '../../workflow/requests/add-fields.request';
import { FieldDto } from '../dtos/field.dto';

@ApiTags('Fields')
export class CreateFieldRequest extends FieldData {
  static getFieldDto(createFieldRequest: CreateFieldRequest) {
    const fieldDto = new FieldDto();
    fieldDto.label = createFieldRequest.label;
    fieldDto.options = createFieldRequest.options;
    fieldDto.dataType = createFieldRequest.dataType;
    return fieldDto;
  }
}
