import { invalidDataType } from '@shared/constant/validation-message.constant';
import { Field } from '../schemas/fields/field.schema';
import { Validation } from '../schemas/validation/validation.schema';
import { Validator } from './main.validator';
import { ValidationResponseUtils } from './validation-response.utils';

export class TypeValidator {
  static validate(field: Field, value: string): boolean {
    switch (field.type) {
      case 'integer':
        return Validator.isInteger(value);
      case 'float':
        return Validator.isFloat(value);
      case 'string':
        return Validator.isString(value);
      case 'array':
        return Validator.isArray(value);
      case 'boolean':
        return Validator.isBoolean(value);
      case 'select':
        return Validator.isPresent(field.options, value);
      case 'mobile':
        return (
          Validator.isInteger(value) && Validator.isMobile(parseInt(value))
        );
    }
    return true;
  }
}
