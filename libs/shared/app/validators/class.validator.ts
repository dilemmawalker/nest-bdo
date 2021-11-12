import { Field } from '../schemas/fields/field.schema';
import { Validation } from '../schemas/validation/validation.schema';
import { Validator } from './main.validator';

export class ClassValidator {
  static typeValidation(field: Field, value: string): boolean {
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

  static dynamicValidation(value: string, validations: Validation[]): boolean {
    if (validations.length === 0) return true;
    return validations.every((validation) =>
      this.validateField(value, validation),
    );
  }

  static validateField(value: string, validation: Validation): boolean {
    switch (validation.type) {
      case 'range':
        return (
          Validator.isFloat(value) &&
          Validator.inRange(
            parseFloat(value),
            validation.options[0].value,
            validation.options[1].value,
          )
        );
      case 'active':
        return Validator.isBoolean(value);
      case 'select':
        return Validator.isPresent(validation.options, value);
      case 'image':
        return Validator.isImageUrl(value);
      case 'url':
        return Validator.isUrl(value);
      case 'required':
        return Validator.isRequired(value);
    }
    return true;
  }
}
