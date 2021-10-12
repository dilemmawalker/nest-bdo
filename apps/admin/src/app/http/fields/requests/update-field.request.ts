import { ApiProperty } from '@nestjs/swagger';
import { FieldDto } from '../dtos/field.dto';
export class UpdateFieldRequest {
  @ApiProperty()
  label: string;

  @ApiProperty()
  options: any;

  static getUserDto(updateFieldRequest: UpdateFieldRequest) {
    const fieldDto = new FieldDto();
    fieldDto.label = updateFieldRequest.label;
    fieldDto.options = updateFieldRequest.options;
    return fieldDto;
  }
}
