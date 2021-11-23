import { Validation } from '../schemas/validation/validation.schema';
import { Validator } from './main.validator';
import { ValidationResponseUtils } from './validation-response.utils';

export class DynamicValidator {
  static validate(
    value: string,
    validations: Validation[],
  ): ValidationResponseUtils {
    let responseResult = ValidationResponseUtils.result(true, '');
    if (validations.length === 0) return responseResult;
    validations.every((validation) => {
      responseResult = this.validateField(value, validation);
      return responseResult.isValid;
    });
    return responseResult;
  }

  static validateField(
    value: string,
  validation: Validation,
  ): ValidationResponseUtils {
    switch (validation.type) {
      case 'range':
        const isValid =
          Validator.isFloat(value) &&
          Validator.inRange(
            parseFloat(value),
            validation.options[0].value,
            validation.options[1].value,
          );
        return ValidationResponseUtils.result(isValid, '');
      case 'required':
        return ValidationResponseUtils.result(Validator.isRequired(value), '');
    }
    return ValidationResponseUtils.result(true, '');
  }
}
