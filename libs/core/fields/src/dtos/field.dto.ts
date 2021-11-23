import { Expression } from '@shared/app/schemas/fields/expression.schema';
import { Mixed, Types } from 'mongoose';

export class FieldDto {
  label: string;
  keyName: string;
  options: Mixed;
  groupKey: string;
  position = 0;
  expression: Expression;
  isEditable = true;
  groups: Types.ObjectId[] = [];
  validations: Types.ObjectId[] = [];
  type: string;
}
