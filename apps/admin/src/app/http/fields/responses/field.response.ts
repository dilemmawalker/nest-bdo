import { ApiProperty } from '@nestjs/swagger';
import { Expression } from '@shared/app/schemas/fields/expression.schema';
import { Field } from '@shared/app/schemas/fields/field.schema';
import { empty } from '@shared/app/utils/function/helper.function';
import { Types } from 'mongoose';

export class FieldResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  keyName: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  options: any;

  @ApiProperty()
  type: string;

  @ApiProperty()
  isEditable: boolean;

  @ApiProperty({ type: Expression })
  expression: Expression;

  @ApiProperty()
  validations: Types.ObjectId[] = [];

  @ApiProperty()
  groups: any[];

  static fromField(field: Field) {
    const entity = new FieldResponse();
    entity.keyName = field.keyName;
    entity._id = field._id;
    entity.label = field.label;
    entity.options = field.options;
    entity.type = field.type;
    entity.isEditable = field.isEditable;
    entity.expression = field.expression || null;
    entity.validations = field.validations;
    entity.groups = field.groups;
    return entity;
  }

  static fromFieldArray(fields: Field[]): FieldResponse[] {
    const entities = [];
    fields.forEach((field) => {
      entities.push(this.fromField(field));
    });
    return entities;
  }
}
