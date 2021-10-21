import { isEmail } from 'class-validator';

export class Validator {
  static isRequired(value: any): boolean {
    return value !== null;
  }

  static isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
  }

  static isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
  }

  static isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  static maxLength(value: string, len: number): boolean {
    return value.length <= len;
  }

  static minLength(value: string, len: number): boolean {
    return value.length >= len;
  }

  static isEmail(value: string): boolean {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(value).toLowerCase());
  }

  static isMobile(value: number): boolean {
    return value >= 1000000000 && value <= 9999999999;
  }

  static isOtp(value: number): boolean {
    return value >= 100000 && value <= 999999;
  }
}
