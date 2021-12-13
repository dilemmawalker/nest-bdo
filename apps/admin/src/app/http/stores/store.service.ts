import { Injectable, NotFoundException } from '@nestjs/common';
import { FieldInputData, Store } from '@shared/app/schemas/stores/store.schema';
import { WorkflowRepository } from 'libs/core/workflow/workflow.repository';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { StoreDto } from './dtos/store.dtos';
import { StoreRepository } from './store.repository';
import { convertToString } from '@shared/app/utils/function/helper.function';

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
    return await this.workflowRepository.findOne(leadWorkflowKey);
  }

  async updateStore(obj: any, storeId: string): Promise<Store> {
    return await this.storeRepository.updateObj(obj, storeId);
  }

  async findOne(storeId: string): Promise<any> {
    return await this.storeRepository.findOne(storeId);
  }

  async getExportableStoreDataArray(workflowKey: string): Promise<any> {
    const stores =
      (await this.storeRepository.findStoreByWorkflowKey(workflowKey)) || [];

    const exportableFields =
      (await this.getWorkflowExportableField(workflowKey)) || [];

    const mappedStore = [];
    stores.forEach((store) => {
      const storeObj = {};
      exportableFields.forEach((obj) => {
        storeObj[obj['label']] =
          convertToString(store.get(obj['keyName'])) || '';
      });

      mappedStore.push(storeObj);
    });
    return mappedStore;
  }

  async getWorkflowExportableField(workflowKey: string): Promise<any> {
    const workflow = await this.workflowRepository.findOne(workflowKey);
    const fieldsArr = [];
    for (const i in workflow.steps) {
      const step = workflow.steps[i];
      const fields = step.fields || [];
      fields.forEach((field) => {
        if (field['isExportable']) {
          const obj = {};
          obj['keyName'] = field['keyName'];
          obj['label'] = field['label'];
          fieldsArr.push(obj);
        }
      });
    }
    return fieldsArr;
  }

  async getStoreInfo(storeId: string): Promise<any> {
    const store = await this.storeRepository.findOne(storeId);

    if (!store) {
      throw new NotFoundException();
    }

    const { workflowKey } = store;
    const workflow = await this.workflowRepository.findOne(workflowKey);

    const stepInputMapping = [];
    const stepFieldMapping = this.getStepsFields(workflow);
    stepFieldMapping.forEach((item) => {
      stepInputMapping.push({
        name: item.name,
        data: this.getInputFields(item.fields, store),
      });
    });
    return stepInputMapping;
  }

  async getAllStores(): Promise<any> {
    return await this.storeRepository.getStores();
  }

  getStepsFields(workflow: Workflow) {
    const stepFieldMapping = [];
    for (const i in workflow.steps) {
      const step = workflow.steps[i];
      stepFieldMapping.push({ name: step.name, fields: step.fields });
    }
    return stepFieldMapping;
  }

  getInputFields(fields: any[], store: any) {
    const dataArray = [];
    const inputFields = FieldInputData.fromFieldArray(fields);
    if (!store) {
      return inputFields;
    }
    for (const i in inputFields) {
      const dataObj = {};
      const inputField = inputFields[i];
      inputField.inputValue = store.get(inputField.keyName);
      dataObj[inputField.keyName] = inputField.inputValue;
      if (inputField.inputValue) {
        dataArray.push(dataObj);
      }
    }
    return dataArray;
  }
}
