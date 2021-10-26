import { Field } from '@shared/app/schemas/fields/field.schema';

export class FieldsDto {
  fields: Field[];
  stepId: string;
  workflowKey: string;
}
