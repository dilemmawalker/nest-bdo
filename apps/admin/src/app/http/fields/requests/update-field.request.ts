import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { FieldDto } from '../dtos/field.dto';
export class UpdateFieldRequest {
  @ApiProperty()
  label: string;

  @ApiProperty()
  options: any;

  @ApiProperty()
  groups: string[] = [];

  @ApiProperty()
  validations: string[] = [];

  static getUserDto(updateFieldRequest: UpdateFieldRequest) {
    const fieldDto = new FieldDto();
    fieldDto.label = updateFieldRequest.label;
    fieldDto.options = updateFieldRequest.options;
    updateFieldRequest.groups.forEach((group) => {
      fieldDto.groups.push(new Types.ObjectId(group));
    });
    updateFieldRequest.validations.forEach((group) => {
      fieldDto.validations.push(new Types.ObjectId(group));
    });
    return fieldDto;
  }
}
