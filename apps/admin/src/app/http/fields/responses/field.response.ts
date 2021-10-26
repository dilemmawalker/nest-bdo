import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@shared/app/schemas/fields/field.schema';
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
  validations: Types.ObjectId[] = [];

  @ApiProperty()
  groups: Types.ObjectId[] = [];

  static fromField(field: Field) {
    const entity = new FieldResponse();
    entity.keyName = field.keyName;
    entity._id = field._id;
    entity.label = field.label;
    entity.options = field.options;
    entity.type = field.type;
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
