import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ActivityService } from 'libs/core/activity/activity.service';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { ActivityResponse } from './response/activity.response';

@ApiTags('Activity Logs')
@Controller('activity-log')
@ApiBearerAuth()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get(':storeId')
  @UseInterceptors(TransformInterceptor)
  async get(@Param('storeId') storeId: string): Promise<any> {
    const result = await this.activityService.getAllStores(storeId);
    return ResponseUtils.success(
      ActivityResponse.fromActivityArray(
        result.activities,
        result.store.store_name,
      ),
    );
  }
}
