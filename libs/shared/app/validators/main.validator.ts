import { isEmail } from 'class-validator';

export class Validator {
  static isRequired(value: any): boolean {
    return value !== null;
  }

  static isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
  }

  static isFloat(value: any): boolean {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
  }

  static isBoolean(value: any): boolean {
    return value === 'true' || value === 'false';
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

  static inRange(options: number, lBound: number, rBound: number): boolean {
    return options >= lBound && options <= rBound;
  }

  static isPresent(options: any, value: any): boolean {
    const array = options.map((option) => option.key);
    return array.some((item) => item === value);
  }

  static isImageUrl(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  static isUrl(url: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(url);
  }

  static isInteger(value: any): boolean {
    return (
      !isNaN(value) && parseInt(value) == value && !isNaN(parseInt(value, 10))
    );
  }
}
