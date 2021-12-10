import {
  fixLengthValidationMessage,
  invalidMinMaxValidation,
  invalidRangeValidation,
  requiredValidation,
} from '@shared/constant/validation-message.constant';
import { Validation } from '../schemas/validation/validation.schema';
import { Validator } from './main.validator';
import { ValidationResponseUtils } from './validation-response.utils';

export class DynamicValidator {
  static validate(
    label: string,
    value: string,
    validations: Validation[],
  ): ValidationResponseUtils {
    let responseResult = ValidationResponseUtils.result(true, '');
    if (validations.length === 0) return responseResult;
    validations.every((validation) => {
      responseResult = this.validateField(label, value, validation);
      return responseResult.isValid;
    });
    return responseResult;
  }

  static validateField(
    label: string,
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
        return ValidationResponseUtils.result(
          isValid,
          invalidRangeValidation(
            label,
            validation.options[0].value,
            validation.options[1].value,
          ),
        );
      case 'fixLength':
        return ValidationResponseUtils.result(
          Validator.fixLength(value, validation.options[0].value),
          fixLengthValidationMessage(label, validation.options[0].value),
        );
      case 'required':
        return ValidationResponseUtils.result(
          !Validator.isNullOrEmpty(value),
          requiredValidation(label),
        );
      case 'min':
        return ValidationResponseUtils.result(
          Validator.min(parseFloat(value), validation.options[0].value),
          invalidMinMaxValidation(label, 'min', validation.options[0].value),
        );
      case 'max':
        return ValidationResponseUtils.result(
          Validator.max(parseFloat(value), validation.options[0].value),
          invalidMinMaxValidation(label, 'max', validation.options[0].value),
        );
      case 'maxlength':
        return ValidationResponseUtils.result(
          Validator.maxLength(value, validation.options[0].value),
          invalidMinMaxValidation(
            label,
            'maxlength',
            validation.options[0].value,
          ),
        );
      case 'minlength':
        return ValidationResponseUtils.result(
          Validator.minLength(value, validation.options[0].value),
          invalidMinMaxValidation(
            label,
            'minlength',
            validation.options[0].value,
          ),
        );
    }
    return ValidationResponseUtils.result(true, '');
  }
}
