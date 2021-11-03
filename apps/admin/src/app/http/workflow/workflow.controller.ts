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
import { AddStepRequest } from './requests/add-steps.request';
import { AssignFieldRequest } from './requests/assign-field.request';
import { CreateWorkflowRequest } from './requests/create-workflow.request';
import { WorkflowResponse } from './responses/workflow.response';
import { UpdatePositionRequest } from './requests/update-position.request';
import { WorkflowService } from 'libs/core/workflow/workflow.service';

@ApiTags('Workflows')
@Controller('workflows')
@ApiBearerAuth()
export class WorkflowController {
  constructor(
    private readonly workflowService: WorkflowService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  @Get(':key')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  async getWorkflow(@Param('key') key: string): Promise<any> {
    const workflow = await this.workflowService.findOne(key);
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/position')
  async updatePosition(
    @Body() updatePositionRequest: UpdatePositionRequest,
  ): Promise<any> {
    const workflow = await this.workflowService.updatePosition(
      UpdatePositionRequest.updatePositionDto(updatePositionRequest),
    );
    return ResponseUtils.success(workflow);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  @Get()
  async getWorkflows(@Request() req): Promise<any> {
    const workflow = await this.workflowService.getWorkflows();
    return workflow;
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  @UseInterceptors(TransformInterceptor)
  async createWorkFlow(
    @Body() createWorkflowRequest: CreateWorkflowRequest,
  ): Promise<any> {
    const workflow = await this.workflowService.updateOrCreateWorkflow(
      CreateWorkflowRequest.getWorkFlowDto(createWorkflowRequest),
    );
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }

  @Post('step/add')
  @UseInterceptors(TransformInterceptor)
  async updateOrCreateStep(@Body() stepsRequest: AddStepRequest): Promise<any> {
    const workflow = await this.workflowService.updateOrCreateStep(
      AddStepRequest.getStepDto(stepsRequest),
    );
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }

  @Post(':workflowKey/step/:stepId/remove')
  @UseInterceptors(TransformInterceptor)
  async removeStep(
    @Param('workflowKey') workflowKey: string,
    @Param('stepId') stepId: string,
  ): Promise<any> {
    const workflow = await this.workflowService.removeStep(workflowKey, stepId);
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }

  @Post('step/fields/assign')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  async assignFields(@Body() assignField: AssignFieldRequest): Promise<any> {
    const workflow = await this.workflowService.assignField(
      AssignFieldRequest.getAssignFieldDto(assignField),
    );
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }

  @Post('step/fields/unassign')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: WorkflowResponse,
  })
  async unassignFields(@Body() assignField: AssignFieldRequest): Promise<any> {
    const workflow = await this.workflowService.unassignField(
      AssignFieldRequest.getAssignFieldDto(assignField),
    );
    return ResponseUtils.success(WorkflowResponse.fromWorkflow(workflow));
  }
}
