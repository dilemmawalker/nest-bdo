import { Field } from '../../../../apps/admin/src/app/schemas/fields/field.schema';

export class FieldsDto {
  fields: Field[];
  stepId: string;
  workflowKey: string;
}
