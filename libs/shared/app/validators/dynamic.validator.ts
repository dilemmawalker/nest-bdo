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
        const lowerbound = validation.options.find((option) => {
          option.key === 'lowerbound';
        });
        const upperbound = validation.options.find((option) => {
          option.key === 'upperbound';
        });
        if (!lowerbound || !upperbound) {
          return ValidationResponseUtils.result(true, '');
        }
        const isValid =
          Validator.isFloat(value) &&
          Validator.inRange(
            parseFloat(value),
            lowerbound.value,
            upperbound.value,
          );
        return ValidationResponseUtils.result(
          isValid,
          invalidRangeValidation(label, lowerbound.value, upperbound.value),
        );
      case 'fixLength':
        const fixLength = validation.options.find((option) => {
          return option.key === 'fixLength';
        });
        if (!fixLength) {
          return ValidationResponseUtils.result(true, '');
        }
        return ValidationResponseUtils.result(
          Validator.fixLength(value, fixLength.value),
          fixLengthValidationMessage(label, fixLength.value),
        );
      case 'required':
        return ValidationResponseUtils.result(
          !Validator.isNullOrEmpty(value),
          requiredValidation(label),
        );
      case 'min':
        const min = validation.options.find((option) => {
          return option.key === 'min';
        });
        if (!min) {
          return ValidationResponseUtils.result(true, '');
        }
        return ValidationResponseUtils.result(
          Validator.min(parseFloat(value), min.value),
          invalidMinMaxValidation(label, 'min', min.value),
        );
      case 'max':
        const max = validation.options.find((option) => {
          return option.key === 'max';
        });
        if (!max) {
          return ValidationResponseUtils.result(true, '');
        }
        return ValidationResponseUtils.result(
          Validator.max(parseFloat(value), max.value),
          invalidMinMaxValidation(label, 'max', max.value),
        );
      case 'maxlength':
        const maxlength = validation.options.find((option) => {
          return option.key === 'maxlength';
        });
        if (!maxlength) {
          return ValidationResponseUtils.result(true, '');
        }
        return ValidationResponseUtils.result(
          Validator.maxLength(value, maxlength.value),
          invalidMinMaxValidation(label, 'maxlength', maxlength.value),
        );
      case 'minlength':
        const minlength = validation.options.find((option) => {
          return option.key === 'minlength';
        });
        if (!minlength) {
          return ValidationResponseUtils.result(true, '');
        }
        return ValidationResponseUtils.result(
          Validator.minLength(value, minlength.value),
          invalidMinMaxValidation(label, 'minlength', minlength.value),
        );
    }
    return ValidationResponseUtils.result(true, '');
  }
}
