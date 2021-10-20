import { isArray, isBoolean, isNumber, isString } from 'class-validator';
import { Field } from '../schemas/fields/field.schema';

export class ClassValidator {
  static typeValidation(field: Field, value: any): boolean {
    switch (field.type) {
      case 'number':
        return isNumber(value);
      case 'string':
        return isString(value);
      case 'array':
        return isArray(value);
      case 'boolean':
        return isBoolean(value);
    }
  }
}
