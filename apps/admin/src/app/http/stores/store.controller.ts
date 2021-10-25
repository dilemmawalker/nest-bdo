import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { StoreLeadResponse } from '../workflow/responses/store-lead.response';
import { StoreService } from './store.service';

@ApiTags('Stores')
@Controller('stores')
@ApiBearerAuth()
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/lead-flow')
  @UseInterceptors(TransformInterceptor)
  async leadFlow() {
    const leadFlow = await this.storeService.getLeadFlow();
    return ResponseUtils.success(StoreLeadResponse.fromWorkflow(leadFlow));
  }

  @Get(':storeId')
  @UseInterceptors(TransformInterceptor)
  async getStoreInfo(@Param('storeId') storeKey: string): Promise<any> {
    const storeInfo = await this.storeService.getStoreInfo(storeKey);
    return ResponseUtils.success(storeInfo);
  }
}
