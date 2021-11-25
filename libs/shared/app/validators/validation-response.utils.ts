export class ValidationResponseUtils {
  isValid: boolean;
  message: string;
  public static result(
    isValid: boolean,
    message?: string,
  ): ValidationResponseUtils {
    const response = new ValidationResponseUtils();
    response.isValid = isValid;
    response.message = message;
    return response;
  }
}
