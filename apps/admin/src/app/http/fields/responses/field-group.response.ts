import { ApiProperty } from '@nestjs/swagger';
import { FieldGroup } from '@shared/app/schemas/fields/field-group.schema';
import { Types } from 'mongoose';

export class FieldGroupResponse {
  @ApiProperty()
  groupKey: string;

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
  static fromFieldGroup(field: FieldGroup) {
    const entity = new FieldGroupResponse();
    entity.groupKey = field.groupKey;
    entity.label = field.label;
    entity.options = field.options;
    entity.type = field.type;
    return entity;
  }

  static fromFieldGroupArray(fieldGroups: FieldGroup[]): FieldGroupResponse[] {
    const entities = [];
    fieldGroups.forEach((fieldGroup) => {
      entities.push(this.fromFieldGroup(fieldGroup));
    });
    return entities;
  }
}
