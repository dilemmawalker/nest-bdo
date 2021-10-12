import { Field } from '../../../schemas/fields/field.schema';

export class FieldsDto {
  fields: Field[];
  stepId: string;
  workflowKey: string;
}
