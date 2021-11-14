import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { ValidationService } from 'libs/core/validations/src/validation.service';
import { CreateValidationRequest } from './requests/create-validation.request';
import { UpdateValidationRequest } from './requests/update-validation.request';
import { ValidationResponse } from './responses/validation.reponse';

@ApiTags('Validation')
@Controller('validation')
@ApiBearerAuth()
export class ValidationController {
  constructor(private readonly validationService: ValidationService) { }

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

  @Get('all')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ValidationResponse],
  })
  async getAll(): Promise<any> {
    const validation = await this.validationService.getAll();
    return ResponseUtils.success(
      ValidationResponse.fromValidationArray(validation),
    );
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
    const updatedValidation = await this.validationService.update(
      UpdateValidationRequest.getValidationDto(updateValidationRequest),
    );
    return ResponseUtils.success(
      ValidationResponse.fromValidation(updatedValidation),
    );
  }
}
