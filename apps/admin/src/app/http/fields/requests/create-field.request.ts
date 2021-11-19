import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { FieldDto } from 'libs/core/fields/src/dtos/field.dto';
import { Types } from 'mongoose';

@ApiTags('Fields')
export class CreateFieldRequest {
  @ApiProperty()
  label: string;

  @ApiProperty()
  options: any;

  @ApiProperty()
  keyName: any = '';

  @ApiProperty()
  isEditable: boolean;

  position: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  groups: string[];

  @ApiProperty()
  validations: string[] = [];

  static getFieldDto(createFieldRequest: CreateFieldRequest) {
    const fieldDto = new FieldDto();
    fieldDto.label = createFieldRequest.label;
    fieldDto.options = createFieldRequest.options;
    fieldDto.type = createFieldRequest.type;
    fieldDto.keyName = createFieldRequest.keyName;
    fieldDto.isEditable = createFieldRequest.isEditable;
    createFieldRequest.groups.forEach((group) => {
      const groupObj = new Types.ObjectId(group);
      fieldDto.groups.push(groupObj);
    });
    createFieldRequest.validations.forEach((val) => {
      const valObj = new Types.ObjectId(val);
      fieldDto.validations.push(valObj);
    });
    return fieldDto;
  }
}
