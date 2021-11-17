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
