import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ValidationDto } from 'libs/core/validations/src/dtos/validation.dto';

@ApiTags('Validation')
export class UpdateValidationRequest {
  @ApiProperty({ required: true })
  _id: string;
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  options: any[];

  @ApiProperty()
  type: string;

  @ApiProperty({ required: true })
  status: boolean;

  static getValidationDto(
    updateValidationRequest: UpdateValidationRequest,
  ): ValidationDto {
    const validationDto = new ValidationDto();
    validationDto.name = updateValidationRequest.name;
    validationDto.options = updateValidationRequest.options;
    validationDto.status = updateValidationRequest.status;
    validationDto.type = updateValidationRequest.type;
    validationDto._id = updateValidationRequest._id;
    return validationDto;
  }
}
