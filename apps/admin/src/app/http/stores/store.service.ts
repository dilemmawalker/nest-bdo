import { Injectable, NotFoundException } from '@nestjs/common';
import { FieldInputData, Store } from '@shared/app/schemas/stores/store.schema';
import { User } from '@shared/app/schemas/users/user.schema';
import { WorkflowRepository } from 'libs/core/workflow/workflow.repository';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { StoreDto } from './dtos/store.dtos';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly workflowRepository: WorkflowRepository,
  ) {}
  async createStore(storeDto: StoreDto): Promise<Store> {
    return await this.storeRepository.create(storeDto);
  }

  async getLeadFlow(): Promise<Workflow> {
    const leadWorkflowKey = process.env.LEAD_WORKFLOW || 'lead';
    return await this.workflowRepository.findOne({ key: leadWorkflowKey });
  }

  async getStoreInfo(storeId: string): Promise<any> {
    const store = await this.storeRepository.findOne(storeId);
    if (!store) {
      throw new NotFoundException();
    }
    const { workflowKey } = store;
    const workflow = await this.workflowRepository.findOne({
      key: workflowKey,
    });
    const stepInputMapping = [];
    const stepFieldMapping = this.getStepsFields(workflow);
    stepFieldMapping.forEach((item) => {
      stepInputMapping.push({
        id: item.id,
        fields: this.getInputFields(item.fields, store),
      });
    });
    return stepInputMapping;
  }

  getStepsFields(workflow: Workflow) {
    const stepFieldMapping = [];
    for (const i in workflow.steps) {
      const step = workflow.steps[i];
      stepFieldMapping.push({ id: step.stepId, fields: step.fields });
    }
    return stepFieldMapping;
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
}
