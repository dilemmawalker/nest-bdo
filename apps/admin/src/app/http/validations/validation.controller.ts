import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { ValidationService } from 'libs/core/validations/src/validation.service';
import { CreateValidationRequest } from './requests/create-validation.request';
import { ValidationResponse } from './responses/validation.reponse';

@ApiTags('Validation')
@Controller('validation')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post('create')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ValidationResponse,
  })
  async createValidation(
    @Body() createValidationRequest: CreateValidationRequest,
  ): Promise<any> {
    const validation = await this.validationService.create(
      CreateValidationRequest.getValidationDto(createValidationRequest),
    );
    return ResponseUtils.success(ValidationResponse.fromValidation(validation));
  }

  @Post('update')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ValidationResponse,
  })
  async updateResponse(
    @Body() updateValidationRequest: UpdateValidationRequest,
  ): Promise<any> {
    const updatedResponse = await this.validationService.update(UpdateV);
  }
}
