import { Injectable, NotFoundException } from '@nestjs/common';
import { FieldInputData, Store } from '@shared/app/schemas/stores/store.schema';
import { WorkflowRepository } from 'libs/core/workflow/workflow.repository';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { StoreDto } from '../dtos/store.dtos';
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

  async getMeetings(storeId: string): Promise<any> {
    const meetings = await this.storeRepository.getMeetings(storeId);
    const store = await this.storeRepository.findOne(storeId);
    return { meetings, store };
  }

  async getMeetingsByDate(storeId: string, date: string): Promise<any> {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 86400000);
    const meetings = await this.storeRepository.getMeetingsByDate(
      storeId,
      startDate,
      endDate,
    );
    if (!meetings) {
      throw new NotFoundException();
    }
    return meetings;
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
    fieldsArr['status'] = { keyName: 'status', label: 'Status' };
    fieldsArr['createdAt'] = { keyName: 'createdAt', label: 'Created At' };
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
      if (inputField.group.length > 0) {
        inputField.inputValue = this.getInputGroupFields(
          inputField.group,
          store.get(inputField.keyName),
        );
      } else {
        inputField.inputValue = store.get(inputField.keyName);
      }
      dataObj[inputField.keyName] = {
        inputValue: inputField.inputValue ? inputField.inputValue : ' ',
        type: inputField.type,
      };
      dataArray.push(dataObj);
    }
    return dataArray;
  }
  getInputGroupFields(
    groupFields: FieldInputData[],
    inputValueObject: any,
  ): any {
    const dataArray = [];
    groupFields.forEach((groupField) => {
      const dataObj = {};
      dataObj[groupField.keyName] = {
        inputValue:
          inputValueObject && inputValueObject[groupField.keyName]
            ? inputValueObject[groupField.keyName]
            : ' ',
        type: groupField.type,
      };
      dataArray.push(dataObj);
    });
    return dataArray;
  }
}
