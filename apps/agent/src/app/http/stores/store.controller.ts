import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { StoreService } from 'libs/core/stores/src/store.service';
import { MeetingResponse } from '../meetings/responses/meeting.response';

@ApiTags('Stores')
@Controller('stores')
@ApiBearerAuth()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseInterceptors(TransformInterceptor)
  @Get('/meetings/:storeId')
  async getMeetingsOfStore(@Param('storeId') storeId: string): Promise<any> {
    const { meetings, store } = await this.storeService.getMeetings(storeId);
    return ResponseUtils.success(MeetingResponse.fromArray(meetings, store));
  }

  @UseInterceptors(TransformInterceptor)
  @Get('/meetings/:storeId/:date')
  async getMeetingsOfStoreByDate(
    @Param('storeId') storeId: string,
    @Param('date') date: string,
  ): Promise<any> {
    const meetings = await this.storeService.getMeetingsByDate(storeId, date);
    return ResponseUtils.success(MeetingResponse.fromArray(meetings));
  }
}
