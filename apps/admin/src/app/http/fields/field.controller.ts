import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { FieldService } from './field.service';
import { CreateFieldRequest } from './requests/create-field.request';
import { FieldResponse } from './responses/field.response';

@ApiTags('Fields')
@Controller('fields')
@ApiBearerAuth()
export class FieldController {
  constructor(
    private readonly fieldService: FieldService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get(':keyName')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: FieldResponse,
  })
  async getField(@Param('keyName') keyName: string): Promise<any> {
    const field = await this.fieldService.findOne(keyName);
    return ResponseUtils.success(FieldResponse.fromField(field));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: FieldResponse,
  })
  @Get()
  async getFields(@Request() req): Promise<any> {
    const fields = await this.fieldService.getFields();
    return ResponseUtils.success(FieldResponse.fromFieldArray(fields));
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: FieldResponse,
  })
  async create(@Body() createFieldRequest: CreateFieldRequest): Promise<any> {
    const field = await this.fieldService.create(
      CreateFieldRequest.getFieldDto(createFieldRequest),
    );
    return ResponseUtils.success(FieldResponse.fromField(field));
  }
}
