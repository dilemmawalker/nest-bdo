import { Mixed } from 'mongoose';

export class FieldDto {
  label: string;
  keyName: string;
  options: Mixed;
  position = 0;
  dataType: string;
}
