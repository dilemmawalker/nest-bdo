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
import { ResponseUtils } from '@shared/app/utils/response.utils';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AddFieldsRequest } from './requests/add-fields.request';
import { CreateWorkflowRequest } from './requests/create-workflow.request';
import { WorkflowResponse } from './responses/workflow.response';
import { WorkflowService } from './workflow.service';
// import { WorkflowResponse } from './responses/workflow.response';

@ApiTags('Workflows')
@Controller('workflows')
@ApiBearerAuth()
export class WorkflowController {
  constructor(
    private readonly workflowService: WorkflowService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get(':key')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  async getUser(@Param('key') key: string): Promise<any> {
    const workflow = await this.workflowService.findOne(key);
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  @Get()
  async getWorkflows(@Request() req): Promise<any> {
    const workflow = await this.workflowService.getWorkflows();
    return ResponseUtils.success(WorkflowResponse.fromWorkflowArray(workflow));
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  @UseInterceptors(TransformInterceptor)
  async createUser(
    @Body() createWorkflowRequest: CreateWorkflowRequest,
  ): Promise<any> {
    const workflow = await this.workflowService.createUser(
      CreateWorkflowRequest.getWorkFlowDto(createWorkflowRequest),
    );
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }

  @Post('fields/:key')
  @UseInterceptors(TransformInterceptor)
  async updateUser(
    @Param('key') key: string,
    @Body() fieldsRequest: AddFieldsRequest,
  ): Promise<any> {
    const workflow = await this.workflowService.addFields(
      key,
      fieldsRequest.fields,
    );
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }
}
