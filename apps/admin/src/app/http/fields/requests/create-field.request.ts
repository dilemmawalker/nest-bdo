import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Expression } from '@shared/app/schemas/fields/expression.schema';
import { empty } from '@shared/app/utils/function/helper.function';
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

  @ApiProperty({ type: Expression })
  expression: Expression;

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
    fieldDto.expression = createFieldRequest.expression;
    fieldDto.isEditable = empty(createFieldRequest.isEditable)
      ? true
      : createFieldRequest.isEditable;
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
