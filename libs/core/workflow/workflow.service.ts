import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Workflow } from '../../shared/app/schemas/workflows/workflow.schema';
import { WorkflowRepository } from './workflow.repository';
import { StoreRepository } from 'apps/admin/src/app/http/stores/store.repository';
import { FieldInputData, Store } from '@shared/app/schemas/stores/store.schema';
import { StoreDto } from 'apps/admin/src/app/http/stores/dtos/store.dtos';
import { WorkflowDto } from './dtos/workflow.dto';
import { AssignFieldDto } from './dtos/assign-field.dto';
import { StepDto } from './dtos/step.dto';
import { generateWorkflowUrl } from '@shared/app/utils/function/helper.function';
import { Step } from '@shared/app/schemas/steps/steps.schema';
import { AgentRepository } from '../agent/src/agent.repository';
import { FieldRepository } from '../fields/src/field.repository';
import { UpdatePositionDto } from './dtos/update-positions.dto';
@Injectable()
export class WorkflowService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly storeRepository: StoreRepository,
    private readonly agentRepository: AgentRepository,
    private readonly fieldRepository: FieldRepository,
  ) {}

  async findOne(key: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne(key);
    if (workflow) {
      return workflow;
    }
    throw new NotFoundException();
  }

  async post(storeDto: StoreDto): Promise<Store> {
    const store = await this.storeRepository.findOne(storeDto.storeId);
    if (!store) {
      return await this.createStore(storeDto);
    } else {
      return await this.updateStore(storeDto);
    }
  }
  async createStore(storeDto: StoreDto): Promise<Store> {
    const agent = await this.agentRepository.getAgent(storeDto.agentId);
    if (!agent.stores) {
      agent.stores = [];
    }
    storeDto = this.populateDataInStoreDto(storeDto, agent);
    const store = await this.storeRepository.create(storeDto);
    agent.stores.push(store._id);
    await this.agentRepository.updateObj(
      { stores: agent.stores },
      storeDto.agentId,
    );
    return store;
  }

  populateDataInStoreDto(storeDto: StoreDto, agent: any) {
    storeDto.storeId = uuidv4();
    storeDto.workflowKey = agent['cluster']['onboarding']['key'];
    storeDto.currentStepId =
      agent['cluster']['onboarding']['steps'][0]['stepId'];
    storeDto.status = 'open';
    storeDto.createdAt = new Date();
    storeDto.updatedAt = new Date();
    return storeDto;
  }

  async updateStore(storeDto: StoreDto): Promise<Store> {
    storeDto.updatedAt = new Date();
    return await this.storeRepository.update(storeDto);
  }

  async getSteps(workflowKey: string) {
    const workflow = await this.findOne(workflowKey);
    return workflow.steps;
  }

  async get(workflowKey: string, storeId: string, stepId: string) {
    const workflow = await this.findOne(workflowKey);
    const store = await this.storeRepository.findOne(storeId);
    const fields: FieldInputData[] = this.getInputFields(
      this.getStepsFields(workflow, stepId),
      store,
    );
    console.log(fields);
    if (store) {
      await this.storeRepository.updateObj({ currentStepId: stepId }, storeId);
    }
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
          next_step_url = generateWorkflowUrl(
            workflow.key,
            next_step.stepId,
            storeId,
          );
        }

        if (prev_step) {
          prev_step_url = generateWorkflowUrl(
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

  getStepsFields(workflow: Workflow, stepId: string) {
    for (const i in workflow.steps) {
      const step = workflow.steps[i];
      if (step.stepId === stepId) {
        return step.fields;
      }
    }
    return [];
  }

  getInputFields(fields: any[], store: any) {
    const inputFields = FieldInputData.fromFieldArray(fields);
    console.log(fields);
    if (!store) {
      return inputFields;
    }
    for (const i in inputFields) {
      const inputField = inputFields[i];
      if (inputField.group.length == 0) {
        inputField.inputValue = store.get(inputField.keyName) || '';
      } else {
        inputField.group.forEach((field) => {
          if (store[inputField.keyName]) {
            inputField.inputValue =
              store.get(inputField.keyName).get(field.keyName) || '';
          }
        });
      }
    }
    return inputFields;
  }

  async getWorkflows(): Promise<Workflow[]> {
    return await this.workflowRepository.find({});
  }

  async updateOrCreateWorkflow(workflowDto: WorkflowDto): Promise<Workflow> {
    if (!workflowDto.key) {
      workflowDto.key = uuidv4();
      return await this.workflowRepository.create(workflowDto);
    } else {
      const workflow = await this.workflowRepository.findOne(workflowDto.key);
      return await this.workflowRepository.updateObj(
        { name: workflowDto.name },
        workflowDto.key,
      );
    }
  }

  async assignField(assignField: AssignFieldDto): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOneWithoutPopulate(
      assignField.workflowKey,
    );
    const field = await this.fieldRepository.findOne({
      keyName: assignField.keyName,
    });
    const steps = workflow.steps;
    for (const i in steps) {
      const element = steps[i];
      if (element.stepId === assignField.stepId) {
        steps[i].fields.push(field._id);
      }
    }
    return await this.workflowRepository.updateObj({ steps }, workflow.key);
  }

  async unassignField(assignField: AssignFieldDto): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOneWithoutPopulate(
      assignField.workflowKey,
    );
    const field = await this.fieldRepository.findOne({
      keyName: assignField.keyName,
    });
    const steps = workflow.steps;
    for (const i in steps) {
      const element = steps[i];
      if (element.stepId === assignField.stepId) {
        const fields = [];
        workflow.steps[i].fields.forEach((fo) => {
          if (fo._id != field.id) {
            fields.push(fo);
          }
        });
        steps[i].fields = fields;
        workflow.steps = steps;
      }
    }
    return await this.workflowRepository.updateObj({ steps }, workflow.key);
  }

  async updateOrCreateStep(stepDto: StepDto): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOneWithoutPopulate(
      stepDto.workflowKey,
    );
    let step;
    if (!workflow) {
      throw new NotFoundException();
    }
    if (!workflow.steps) {
      workflow.steps = [];
    }
    if (!stepDto.stepId) {
      step = this.getNewStep(stepDto);
      workflow.steps.push(step);
    } else {
      const stepIndex = workflow.steps.findIndex(function (e) {
        return e.stepId == stepDto.stepId;
      });
      console.log(stepIndex);
      console.log(workflow.steps[stepIndex]);
      workflow.steps[stepIndex].name = stepDto.name;
    }
    return await this.workflowRepository.updateObj(
      { steps: workflow.steps },
      stepDto.workflowKey,
    );
  }

  getNewStep(stepDto: StepDto): Step {
    const step = new Step();
    step.stepId = uuidv4();
    step.name = stepDto.name;
    step.position = stepDto.position;
    step.fields = [];
    return step;
  }

  async removeStep(workflowKey: string, stepId: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOneWithoutPopulate(
      workflowKey,
    );
    const steps = [];
    workflow.steps.forEach((step) => {
      if (step.stepId != stepId) {
        steps.push(step);
      }
    });
    return await this.workflowRepository.updateObj({ steps }, workflowKey);
  }

  async updatePosition(updatePositionDto: UpdatePositionDto): Promise<any> {
    const workflow = await this.workflowRepository.findOneWithoutPopulate(
      updatePositionDto.workflowKey,
    );

    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];

      if (step.stepId == updatePositionDto.stepId) {
        if (!updatePositionDto.fieldId) {
          console.log('step update');
          console.log(workflow.steps);
          workflow.steps.splice(i, 1);
          console.log(workflow.steps);
          workflow.steps.splice(updatePositionDto.index, 0, step);
          console.log(workflow.steps);
          break;
        }
        console.log('field update');
        workflow.steps[i].fields = this.changeFieldPosition(
          step,
          updatePositionDto,
          workflow,
        );
      }
    }
    return this.workflowRepository.updateObj(
      { steps: workflow.steps },
      workflow.key,
    );
  }

  changeFieldPosition(step, updatePositionDto, workflow) {
    if (step.stepId === updatePositionDto.stepId) {
      for (let j = 0; j < step.fields.length; j++) {
        if (step.fields[j].equals(updatePositionDto.fieldId)) {
          const selectedField = step.fields[j];
          const index = updatePositionDto.index;
          step.fields.splice(j, 1);
          step.fields.splice(index, 0, selectedField);
        }
      }
    }
    return step.fields;
  }
}
