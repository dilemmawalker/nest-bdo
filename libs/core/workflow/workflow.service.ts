import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Workflow } from '../../shared/app/schemas/workflows/workflow.schema';
import { AssignFieldDto } from '../../../apps/admin/src/app/http/workflow/dtos/assign-field.dto';
import { FieldsDto } from '../../../apps/admin/src/app/http/workflow/dtos/fields.dto';
import { StepDto } from '../../../apps/admin/src/app/http/workflow/dtos/step.dto';
import { WorkflowDto } from '../../../apps/admin/src/app/http/workflow/dtos/workflow.dto';
import { WorkflowRepository } from './workflow.repository';
import { StoreRepository } from 'apps/admin/src/app/http/stores/store.repository';
import { WorkflowResponse } from 'apps/agent/src/app/http/workflow/response/workflow.response';
import { Field } from '@shared/app/schemas/fields/field.schema';
import { FieldInputData, Store } from '@shared/app/schemas/stores/store.schema';
import { StoreDto } from 'apps/admin/src/app/http/stores/dtos/store.dtos';
@Injectable()
export class WorkflowService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async findOne(key: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({ key });
    if (workflow) {
      return workflow;
    }
    throw new NotFoundException();
  }

  async post(storeDto: StoreDto): Promise<Store> {
    const store = await this.storeRepository.findOne(storeDto.storeId);
    if (!store) {
      storeDto.storeId = uuidv4();
      return await this.createStore(storeDto);
    } else {
      return await this.updateStore(storeDto);
    }
  }
  async createStore(storeDto: StoreDto): Promise<Store> {
    return await this.storeRepository.create(storeDto);
  }
  async updateStore(storeDto: StoreDto): Promise<Store> {
    return await this.storeRepository.update(storeDto);
  }

  async get(workflowKey: string, storeId: string, stepId: string) {
    const workflow = await this.findOne(workflowKey);
    const store = await this.storeRepository.findOne(storeId);
    const fields: FieldInputData[] = this.getInputFields(
      this.getStepsFields(workflow, stepId),
      store,
    );
    const meta = this.getStoreMeta(workflow, store, stepId);
    return { fields, meta };
  }

  getStoreMeta(workflow: Workflow, store: Store, stepId: string) {
    let current_step = 1;
    const total_step = workflow.steps.length;
    let current_step_name = '';
    let next_step_url = '';
    let prev_step_url = '';
    const storeId = Boolean(store) ? store.storeId : 'new';

    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      const next_step = workflow.steps[i + 1];
      const prev_step = workflow.steps[i - 1];

      if (stepId === step.stepId) {
        current_step = i + 1;
        current_step_name = step.name;
        if (next_step) {
          next_step_url = this.generateStepUrl(
            workflow.key,
            next_step.stepId,
            storeId,
          );
        }

        if (prev_step) {
          prev_step_url = this.generateStepUrl(
            workflow.key,
            prev_step.stepId,
            storeId,
          );
        }
      }
    }
    return {
      current_step,
      total_step,
      current_step_name,
      next_step_url,
      prev_step_url,
    };
  }

  generateStepUrl(workflowKey: string, stepId: string, storeId: string) {
    return `agent/api/workflow/${workflowKey}/${stepId}/${storeId}`;
  }

  getStepsFields(workflow: Workflow, stepId: string) {
    for (const i in workflow.steps) {
      const step = workflow.steps[i];
      if (step.stepId === stepId) {
        return step.fields;
      }
    }
    return [];
  }
  getInputFields(fields: any[], store: Store) {
    const inputFields = FieldInputData.fromFieldArray(fields);
    if (!store) {
      return inputFields;
    }
    for (const i in inputFields) {
      const inputField = inputFields[i];
      inputField.inputValue = store[inputField.keyName];
    }
    return inputFields;
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
