import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { UtilitiesService } from '@utility/utilities/utilities.service';
import { DataTypeResponse } from 'apps/agent/src/app/http/utility/response/data-type.response';
import { CreateDataTypeRequest } from './request/create-data-type.request';

@ApiTags('Utility')
@Controller('utility')
@UseInterceptors(TransformInterceptor)
export class UtilityController {
  constructor(private utilitiesService: UtilitiesService) {}

  @ApiResponse({
    status: 200,
  })
  @Get('data-types')
  async dataTypes() {
    const dataTypes = await this.utilitiesService.getDataTypes();
    return ResponseUtils.success({ types: dataTypes });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DataTypeResponse,
  })
  @Post('data-types/update')
  async addDataType(
    @Body() createDataTypeRequest: CreateDataTypeRequest,
  ): Promise<any> {
    const dataType = await this.utilitiesService.addDataType(
      CreateDataTypeRequest.getDataTypeDto(createDataTypeRequest),
    );
    return ResponseUtils.success(DataTypeResponse.fromDataType(dataType));
  }
}
