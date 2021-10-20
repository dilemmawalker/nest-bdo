import { WorkflowRequestField } from 'apps/agent/src/app/http/workflow/requests/workflow.request';
import { Validator } from './main.validator';

export class ClassValidator {
  static typeValidation(field: WorkflowRequestField): boolean {
    const value = field.inputValue;
    switch (field.type) {
      case 'number':
        return Validator.isNumber(value);
      case 'string':
        return Validator.isString(value);
      case 'array':
        return Validator.isArray(value);
      case 'boolean':
        return Validator.isBoolean(value);
    }
  }
}
