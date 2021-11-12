import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { ValidationUtils } from '@shared/app/utils/class/validation.utils';
import { WorkflowResponse } from 'apps/admin/src/app/http/workflow/responses/workflow.response';
import { WorkflowService } from 'libs/core/workflow/workflow.service';
import {
  WorkflowRequest,
  WorkflowRequestField,
} from './requests/workflow.request';
import { WorkflowStepResponse } from './response/workflow-steps.response';

@ApiTags('Workflows')
@Controller('workflows')
@ApiBearerAuth()
export class WorkflowController {
  constructor(
    private readonly workflowService: WorkflowService,
    private readonly jwtUtil: JWTUtil,
    private readonly validationUtil: ValidationUtils,
  ) {}

  @Get(':workflowKey/:storeId/steps')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [WorkflowStepResponse],
  })
  @ApiParam({
    name: 'workflowKey',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'storeId',
    type: String,
    required: true,
  })
  async getWorkflowSteps(
    @Param('workflowKey') workflowKey: string,
    @Param('storeId') storeId: string,
  ): Promise<any> {
    const steps = await this.workflowService.getSteps(workflowKey);
    return ResponseUtils.success(WorkflowStepResponse.fromStepsArray(steps));
  }

  @Get(':workflowKey/:stepId/:storeId')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  @ApiParam({
    name: 'stepId',
    type: String,
    required: false,
  })
  async getWorkflow(
    @Param('workflowKey') workflowKey: string,
    @Param('storeId') storeId?: string,
    @Param('stepId') stepId?: string,
  ): Promise<any> {
    const workflowGet = await this.workflowService.get(
      workflowKey,
      storeId,
      stepId,
    );
    return ResponseUtils.success(workflowGet);
  }

  @Post(':workflowKey/:stepId/:storeId')
  @UseInterceptors(TransformInterceptor)
  async postWorkflow(
    @Headers('Authorization') auth: string,
    @Body() workflowRequest: WorkflowRequest,
    @Param('workflowKey') workflowKey: string,
    @Param('stepId') stepId: string,
    @Param('storeId') storeId?: string,
  ): Promise<any> {
    await this.validationUtil.validateWorkFlowRequestFields(
      workflowRequest.fields,
    );
    const workflowGet = await this.workflowService.get(
      workflowKey,
      storeId,
      stepId,
    );
    const json = await this.jwtUtil.decode(auth);
    const store = await this.workflowService.post(
      WorkflowRequest.getStoreDto(
        workflowRequest,
        workflowKey,
        stepId,
        storeId,
        json.agentId,
      ),
    );
    return ResponseUtils.success(store);
  }
}
