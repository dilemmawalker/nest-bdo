import { isEmail } from 'class-validator';

export class Validator {
  static isRequired(value: any): boolean {
    return value !== null;
  }

  static maxLength(value: string, len: number): boolean {
    return value.length <= len;
  }

  static minLength(value: string, len: number): boolean {
    return value.length >= len;
  }

  static isEmail(value: string): boolean {
    return isEmail(value);
  }

  static isMobile(value: number): boolean {
    return value >= 1000000000 && value <= 9999999999;
  }

  static isOtp(value: number): boolean {
    return value >= 100000 && value <= 999999;
  }
}
