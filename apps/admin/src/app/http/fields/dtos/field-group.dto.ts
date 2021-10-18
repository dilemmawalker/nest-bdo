import { Mixed } from 'mongoose';

export class FieldGroupDto {
  label: string;
  groupKey: string;
  options: Mixed;
  position = 0;
  type: string;
}
