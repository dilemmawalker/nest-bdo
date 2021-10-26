import { Field } from '@shared/app/schemas/fields/field.schema';

export class WorkflowDto {
  name: string;
  key: string;
  position: number;
  fields: Field[];
}
