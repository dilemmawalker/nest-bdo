import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { UtilitiesService } from '@utility/utilities/utilities.service';

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
    status: 200,
  })
  @Get('rejection-reasons')
  async rejectionReasons() {
    const rejectionReasonsArray =
      this.utilitiesService.getReasonForRejectionArray();
    return ResponseUtils.success({ reasons: rejectionReasonsArray });
  }
}
