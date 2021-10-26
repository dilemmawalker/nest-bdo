import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ValidationDto } from 'libs/core/validations/src/dtos/validation.dto';

@ApiTags('Validation')
export class CreateValidationRequest {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  options: any[];

  @ApiProperty()
  type: string;

  @ApiProperty({ required: true })
  status: boolean;

  static getValidationDto(
    createValidationRequest: CreateValidationRequest,
  ): ValidationDto {
    const validationDto = new ValidationDto();
    validationDto.name = createValidationRequest.name;
    validationDto.options = createValidationRequest.options;
    validationDto.status = createValidationRequest.status;
    validationDto.type = createValidationRequest.type;
    return validationDto;
  }
}
