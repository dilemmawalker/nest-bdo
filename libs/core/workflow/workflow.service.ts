import { Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_WORKFLOW_POSITION } from 'apps/admin/src/constant/workflows/workflow.constant';
import { v4 as uuidv4 } from 'uuid';
import { Workflow } from '../../../apps/admin/src/app/schemas/workflows/workflow.schema';
import { AssignFieldDto } from './dtos/assign-field.dto';
import { FieldsDto } from './dtos/fields.dto';
import { StepDto } from './dtos/step.dto';
import { WorkflowDto } from './dtos/workflow.dto';
import { WorkflowRepository } from './workflow.repository';
@Injectable()
export class WorkflowService {
  constructor(private readonly workflowRepository: WorkflowRepository) {}

  async findOne(key: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({ key });
    if (workflow) {
      return workflow;
    }
    throw new NotFoundException();
  }

  async getWorkflows(): Promise<Workflow[]> {
    return await this.workflowRepository.find({});
  }

  async createWorkFlow(workflowDto: WorkflowDto): Promise<Workflow> {
    workflowDto.key = uuidv4();
    return await this.workflowRepository.create(workflowDto);
  }

  async addFields(fieldDto: FieldsDto): Promise<Workflow> {
    return await this.workflowRepository.addFields(fieldDto);
  }

  async assignField(assignField: AssignFieldDto): Promise<Workflow> {
    return await this.workflowRepository.assignField(assignField);
  }

  async unassignField(assignField: AssignFieldDto): Promise<Workflow> {
    return await this.workflowRepository.unassignField(assignField);
  }

  async addStep(step: StepDto): Promise<Workflow> {
    step.stepId = uuidv4();
    return await this.workflowRepository.addStep(step);
  }
  async removeStep(workflowKey: string, stepId: string): Promise<Workflow> {
    return await this.workflowRepository.removeStep(workflowKey, stepId);
  }
}
