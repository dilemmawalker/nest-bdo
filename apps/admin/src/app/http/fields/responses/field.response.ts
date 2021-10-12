import { ApiProperty } from '@nestjs/swagger';
import { Field } from '../../../schemas/fields/field.schema';

export class FieldResponse {
  @ApiProperty()
  keyName: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  options: any;

  @ApiProperty()
  dataType: string;

  static fromField(field: Field) {
    const entity = new FieldResponse();
    entity.keyName = field.keyName;
    entity.label = field.label;
    entity.options = field.options;
    entity.dataType = field.dataType;
    return entity;
  }

  static fromFieldArray(fields: Field[]): FieldResponse[] {
    const entities = [];
    fields.forEach((user) => {
      entities.push(this.fromField(user));
    });
    return entities;
  }
}
