import { Mixed, Types } from 'mongoose';

export class FieldDto {
  label: string;
  keyName: string;
  options: Mixed;
  groupKey: string;
  position = 0;
  groups: Types.ObjectId[] = [];
  validations: Types.ObjectId[] = [];
  type: string;
}
