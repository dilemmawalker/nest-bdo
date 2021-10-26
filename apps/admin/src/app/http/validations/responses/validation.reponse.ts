import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Validation } from '@shared/app/schemas/validation/validation.schema';

@ApiTags('Validation')
export class ValidationResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  options: any[];

  @ApiProperty()
  type: string;

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
}
