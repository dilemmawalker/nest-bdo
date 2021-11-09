import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Validation } from '@shared/app/schemas/validation/validation.schema';

@ApiTags('Validation')
export class ValidationResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  options: any[];

  @ApiProperty()
  type = '';

  @ApiProperty()
  status: boolean;

  static fromValidation(validation: Validation): ValidationResponse {
    const response = new ValidationResponse();
    response.name = validation.name;
    response.options = validation.options;
    response.status = validation.status;
    response.type = validation.type;
    return response;
  }

  static fromValidationArray(validations: Validation[]): ValidationResponse[] {
    const entities = [];
    validations.forEach((validation) => {
      entities.push(this.fromValidation(validation));
    });
    return entities;
  }
}
