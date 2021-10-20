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
import { ClassValidator } from '@shared/app/validators/class.validator';
import { StoreResponse } from 'apps/admin/src/app/http/stores/responses/store.response';
import { WorkflowResponse } from 'apps/admin/src/app/http/workflow/responses/workflow.response';
import { WorkflowService } from 'libs/core/workflow/workflow.service';
import { WorkflowRequest } from './requests/workflow.request';

@ApiTags('Workflows')
@Controller('workflows')
@ApiBearerAuth()
export class WorkflowController {
  constructor(
    private readonly workflowService: WorkflowService,
    private readonly jwtUtil: JWTUtil,
  ) {}

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
    if (!this.validate(workflowRequest)) {
      throw new BadRequestException();
    }
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

  validate(workflowRequest: WorkflowRequest) {
    let isValid = true;
    workflowRequest.fields.forEach((field) => {
      isValid = isValid && ClassValidator.typeValidation(field);
    });
    return isValid;
  }
}
