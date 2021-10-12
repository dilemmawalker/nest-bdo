import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { StoreLeadResponse } from '../workflow/responses/store-lead.response';
import { CreateStoreRequest } from './requests/create-store.request';
import { StoreResponse } from './responses/store.response';
import { StoreService } from './store.service';

@ApiTags('Stores')
@Controller('stores')
@ApiBearerAuth()
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @UseInterceptors(TransformInterceptor)
  async createStore(
    @Body() createStoreRequest: CreateStoreRequest,
  ): Promise<any> {
    const store = await this.storeService.createStore(
      CreateStoreRequest.getStoreDto(createStoreRequest),
    );
    return ResponseUtils.success(StoreResponse.fromStore(store));
  }

  @Get('/lead-flow')
  @UseInterceptors(TransformInterceptor)
  async leadFlow() {
    const leadFlow = await this.storeService.getLeadFlow();
    return ResponseUtils.success(StoreLeadResponse.fromWorkflow(leadFlow));
  }
}
