import { WorkflowRequestField } from 'apps/agent/src/app/http/workflow/requests/workflow.request';
import { Field } from '../schemas/fields/field.schema';
import { Validation } from '../schemas/validation/validation.schema';
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
    return false;
  }

  static dynamicValidation(value: string, validations: Validation[]): boolean {
    return validations.every((validation) =>
      this.validateField(value, validation),
    );
  }

  static validateField(value: string, validation: Validation): boolean {
    switch (validation.type) {
      case 'range':
        return Validator.inRange(
          parseFloat(value),
          validation.options[0],
          validation.options[1],
        );
      case 'active':
        return Validator.isBoolean(value);
      case 'select':
        return Validator.isPresent(validation.options, value);
    }
    return false;
  }
}
