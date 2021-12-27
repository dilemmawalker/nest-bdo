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
import { MeetingResponse } from 'apps/agent/src/app/http/meetings/responses/meeting.response';
import { StoreService } from 'libs/core/stores/src/store.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { StoreLeadResponse } from '../workflow/responses/store-lead.response';
import { StoreResponse } from './responses/store.response';

@ApiTags('Stores')
@Controller('stores')
@ApiBearerAuth()
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getAllStores(): Promise<any> {
    const stores = await this.storeService.getAllStores();
    return ResponseUtils.success(
      StoreResponse.fromStoreArray(stores, 'any', -1, -1),
    );
  }

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

  @Get('/exportable/stores')
  @UseInterceptors(TransformInterceptor)
  async getStoreExportableDetails(): Promise<any> {
    const workflowKey =
      process.env.DEFAULT_STORE_ONBOARDING_WORKFLOW ||
      '36f95603-fd8e-4e01-943e-9875ef53c0fa';
    const storeInfo = await this.storeService.getExportableStoreDataArray(
      workflowKey,
    );
    return ResponseUtils.success(storeInfo);
  }

  @UseInterceptors(TransformInterceptor)
  @Get('/meetings/:storeId')
  async getMeetingsOfStore(@Param('storeId') storeId: string): Promise<any> {
    const { meetings, store }  = await this.storeService.getMeetings(storeId);
    return ResponseUtils.success(MeetingResponse.fromArray(meetings, store));
  }
}
