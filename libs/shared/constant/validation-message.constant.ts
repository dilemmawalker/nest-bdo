export const REJECTION_REASON_ARRAY = '';

export function invalidDataType(type: string, fieldLabel: string): string {
  return `Invalid data type ${type} of ${fieldLabel}`;
}

export function invalidRangeValidation(
  fieldLabel: string,
  lowerBound: any,
  upperBound: any,
): string {
  return `${fieldLabel} has invalid range, data must be in range ${lowerBound} to ${upperBound}`;
}

export function requiredValidation(fieldLabel: string): string {
  return `${fieldLabel} is required`;
}

export function fixLengthValidationMessage(
  fieldLabel: string,
  length: number,
): string {
  return `${fieldLabel} should be of ${length} characters`;
}

export function invalidMinMaxValidation(
  fieldLabel: string,
  type: string,
  bound: string,
): string {
  const slug = type.match('max*')
    ? `lesser than ${parseFloat(bound) + 1}`
    : `greater than ${parseFloat(bound) - 1}`;
  let data = 'data';
  if (type === 'maxlength' || type === 'minlength') data += ' length';
  return `${fieldLabel} has invalid range, ` + data + ` must be ` + slug;
}
