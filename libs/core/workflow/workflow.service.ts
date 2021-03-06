import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Workflow } from '../../shared/app/schemas/workflows/workflow.schema';
import { WorkflowRepository } from './workflow.repository';
import { StoreRepository } from 'libs/core/stores/src/store.repository';
import { FieldInputData, Store } from '@shared/app/schemas/stores/store.schema';
import { StoreDto, StoreField } from 'libs/core/stores/dtos/store.dtos';
import { WorkflowDto } from './dtos/workflow.dto';
import { AssignFieldDto } from './dtos/assign-field.dto';
import { StepDto } from './dtos/step.dto';

import { FileDto } from '@file/file/dtos/file.dto';


import {
  empty,
  generateWorkflowUrl,
  getAgreementName,
  getCurrentDate,
} from '@shared/app/utils/function/helper.function';

import { generateWorkflowUrl } from '@shared/app/utils/function/helper.function';

import { Step } from '@shared/app/schemas/steps/steps.schema';
import { AgentRepository } from '../agent/src/agent.repository';
import { FieldRepository } from '../fields/src/field.repository';
import { UpdatePositionDto } from './dtos/update-positions.dto';
import { ActivityService } from '../activity/activity.service';
import { ActivityDto } from '../activity/dtos/activity.dto';

import {
  Expression,
  ExpressionVariable,
} from '@shared/app/schemas/fields/expression.schema';

import {
  generateAgreementCardHtml,
  generateAgreementCardPdfHtml,
  generateAgreementPdfHtml,
} from '@shared/app/utils/function/dynamic.function';
import { FileService } from '@file/file/file.service';
=======
import { isContext } from 'vm';
import { Validator } from '@shared/app/validators/main.validator';



import { UpdateWorflowDto } from './dtos/updateWorkflow.dto';


@Injectable()
export class WorkflowService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly storeRepository: StoreRepository,
    private readonly agentRepository: AgentRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly activityService: ActivityService,
    private readonly fileService: FileService,
  ) {}

  async findOne(key: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne(key);
    if (workflow) {
      return workflow;
    }
    throw new NotFoundException();
  }

  async post(storeDto: StoreDto): Promise<any> {
    const workflowKey = storeDto.workflowKey;
    const store = await this.storeRepository.findOne(storeDto.storeId);
    if (!store) {
      const storeObj = await this.createStore(storeDto);
      return await this.get(workflowKey, 'new', storeDto.stepId);
    } else {
      const storeObj = await this.updateStore(storeDto);
      return await this.get(
        storeDto.workflowKey,
        storeObj.storeId,
        storeDto.stepId,
      );
    }
  }
  containField(keyName, label, fields: StoreField[]) {
    let isContainKeyName = false;
    fields.forEach((field) => {
      if (field.keyName == keyName) {
        isContainKeyName = true;
      }
    });
    if (!isContainKeyName) {
      throw new BadRequestException(
        label + ' is required',
        label + ' is required',
      );
    }
  }
  async createStore(storeDto: StoreDto): Promise<Store> {
    const agent = await this.agentRepository.getAgent(storeDto.agentId);
    if (!agent.stores) {
      agent.stores = [];
    }
    storeDto.createdBy = agent._id;
    storeDto.agent_name = agent.get('user').name;
    storeDto.agent_id = agent.agentId;

    if (storeDto.fields.length == 0) {
      throw new BadRequestException(
        'Please enter store name',
        'Please enter store name',
      );
    }
    this.containField('store_name', 'Store Name', storeDto.fields);
    this.containField('owner_name', 'Owner Name', storeDto.fields);

    storeDto = this.populateDataInStoreDto(storeDto, agent);
    const store = await this.storeRepository.create(storeDto);
    agent.stores.push(store._id);
    await this.agentRepository.updateObj(
      { stores: agent.stores },
      storeDto.agentId,
    );

    await this.activityService.push(
      new ActivityDto(
        'Store',
        'Created',
        'Store',
        store.storeId,
        'Agent',
        storeDto.agentId,
        '{}',
        getCurrentDate(),
      ),
    );
    return store;
  }

  populateDataInStoreDto(storeDto: StoreDto, agent: any) {
    storeDto.storeId = uuidv4();
    storeDto.workflowKey = agent['cluster']['onboarding']['key'];
    storeDto.currentStepId =
      agent['cluster']['onboarding']['steps'][0]['stepId'];
    storeDto.status = 'interested';
    storeDto.createdAt = new Date();
    storeDto.updatedAt = new Date();
    return storeDto;
  }

  async updateStore(storeDto: StoreDto): Promise<Store> {
    storeDto.updatedAt = new Date();
    const store = await this.storeRepository.update(storeDto);
    await this.activityService.push(
      new ActivityDto(
        'Store',
        'Updated',
        'Store',
        store.storeId,
        'Agent',
        storeDto.agentId,
        '{}',
        new Date(Date.now()),
      ),
    );
    return store;
  }

  async getSteps(workflowKey: string, storeId: string) {
    const workflow = await this.findOne(workflowKey);
    const store = await this.storeRepository.findOne(storeId);
    const completedStatus = {};
    for (const step of workflow.steps) {
      const obj: any = await this.getInputFields(
        this.getStepsFields(workflow, step.stepId),
        store,
      );
      completedStatus[step.stepId] = this.isStepCompleted(obj.fields);
    }
    return { steps: workflow.steps, completedStatus };
  }

  isStepCompleted(fields: any): boolean {
    return fields.every((field) => {
      if (field.group.length === 0) return this.isStepFieldCompleted(field);

      return (
        !field.isEditable ||
        field.group.every((fieldGroupField) =>
          this.isStepFieldCompleted(fieldGroupField),
        )
      );
    });
  }
  isStepFieldCompleted(field: FieldInputData): boolean {
    return !field.isEditable || !this.isFieldNullOrEmpty(field.inputValue);
  }

  isFieldNullOrEmpty(value: string): boolean {
    return value === null || value.length === 0;
  }
  async get(workflowKey: string, storeId: string, stepId: string) {
    const workflow = await this.findOne(workflowKey);
    const store = await this.storeRepository.findOne(storeId);

    const obj: any = await this.getInputFields(
      this.getStepsFields(workflow, stepId),
      store,
    );

    if (store) {
      obj.dynamicFields['currentStepId'] = stepId;
      await this.storeRepository.updateObj(obj.dynamicFields, storeId);
    }

    const is_step_completed = this.checkStepCompleted(obj.fields);
    const meta = this.getStoreMeta(workflow, store, stepId);
    meta['is_step_completed'] = is_step_completed;
    meta['ref_id'] = storeId;
    return { fields: obj.fields, meta };
  }

  getStoreMeta(workflow: Workflow, store: any, stepId: string) {
    let current_step = 1;
    const total_step = workflow.steps.length;
    let current_step_name = '';
    let next_step_url = '';
    let prev_step_url = '';

    const storeId = Boolean(store) ? store.storeId : 'new';

    const current_step_url = generateWorkflowUrl(workflow.key, stepId, storeId);

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
      current_step_url,
    };
  }
  checkStepCompleted(fields: FieldInputData[]) {
    let is_step_completed = true;
    fields.forEach((field) => {
      if (field.isEditable) {
        if (empty(field.inputValue)) {
          is_step_completed = false;
        }
      }
    });
    return is_step_completed;
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

  getMappedOptValue(options, keyName) {
    let val = null;
    if (options) {
      options.forEach((option) => {
        if (option['key'] == keyName) {
          val = option['value'];
        }
      });
    }
    return val;
  }
  async setEqualField(fields: FieldInputData[], store: any) {
    let updateStore = store;
    fields.forEach(async (field) => {
      if (this.getMappedOptValue(field.options, 'isCopyable') == 'true') {
        if (store.get(field.keyName) == 'true') {
          const copyableFrom = this.getMappedOptValue(
            field.options,
            'copyableFrom',
          );
          const copyableTo = this.getMappedOptValue(
            field.options,
            'copyableTo',
          );
          const copiableVal = store.get(copyableFrom) || '';
          const updateObj = {};
          updateObj[copyableTo] = copiableVal;
          updateStore = await this.storeRepository.updateObj(
            updateObj,
            store.get('storeId'),
          );
        }
      }
    });
    return updateStore;
  }
  async getInputFields(fields: any[], store: any) {
    const inputFields = FieldInputData.fromFieldArray(fields);
    const dynamicFields = {};
    store = await this.setEqualField(inputFields, store);
    if (!store) {
      return { fields: inputFields, dynamicFields };
    }
    for (const i in inputFields) {
      const inputField = inputFields[i];
      if (inputField.expression) {
        const calculatedValue = await this.calculateFieldExpression(
          inputField.expression,
          store,
        );
        dynamicFields[inputField.keyName] = calculatedValue;
        inputField.inputValue = calculatedValue;
      } else if (inputField.group.length == 0) {
        inputField.inputValue =
          store.get(inputField.keyName) || inputField.inputValue;
      } else {
        const groupValue = {};
        inputField.group.forEach(async (field, index) => {
          if (field.expression) {
            const val = await this.calculateFieldExpression(
              field.expression,
              store,
            );
            groupValue[field.keyName] = val;
            inputFields[i].group[index].inputValue = val;
          } else {
            if (store.get(inputField.keyName)) {
              groupValue[field.keyName] =
                store.get(inputField.keyName)[field.keyName] || '';
              inputFields[i].group[index].inputValue =
                groupValue[field.keyName];
            }
          }
        });
        dynamicFields[inputField.keyName] = groupValue;
      }
    }
    return { fields: inputFields, dynamicFields };
  }

  async calculateFieldExpression(
    expression: Expression,
    store: any,
  ): Promise<number> {
    let value: any = '';
    if (expression.operator == 'add' || expression.operator == 'subtract') {
      value = 0;
    }
    if (expression.operator == 'multiply') {
      value = 1;
    }
    if (expression.operator == 'equal') {
      value = '';
    }
    if (!expression.variables) {
      return value;
    }
    expression.variables.forEach(async (val: ExpressionVariable) => {
      if (val.type == 'constant') {
        if (expression.operator == 'add') {
          value += parseFloat(val.value);
        }
        if (expression.operator == 'subtract') {
          if (value == 0) {
            value = parseFloat(val.value);
          } else {
            value -= parseFloat(val.value);
          }
          value += parseFloat(val.value);
        }
        if (expression.operator == 'multiply') {
          value *= parseFloat(val.value);
        }
        if (expression.operator == 'function') {
          if (val.value == 'generateAgreementCardHtml') {
            value = generateAgreementCardHtml(store);
            const pdfBuffer = await this.fileService.generatePDF(
              generateAgreementCardPdfHtml(store),
            );
            const pdfFileName = `pdf/${getAgreementName(store)}`;
            const pdfFileDto = new FileDto();
            pdfFileDto.keyName = 'agreement_pdf';
            pdfFileDto.isMultiple = false;
            pdfFileDto.refId = store.get('storeId');
            pdfFileDto.fileName = pdfFileName;
            await this.fileService.uploadFile(
              pdfBuffer,
              pdfFileName,
              pdfFileDto,
            );
          } else if (val.value == 'generateAgreementPdfHtml') {
            value = generateAgreementPdfHtml(store);
            const pdfBuffer = await this.fileService.generatePDF(
              generateAgreementPdfHtml(store),
            );
            const pdfFileNamePdf = `pdf/${store.get('storeId')}.pdf`;
            const pdfFileDto = new FileDto();
            pdfFileDto.keyName = 'agreement_pdf';
            pdfFileDto.isMultiple = false;
            pdfFileDto.refId = store.get('storeId');
            pdfFileDto.fileName = pdfFileNamePdf;
            await this.fileService.uploadFile(
              pdfBuffer,
              pdfFileNamePdf,
              pdfFileDto,
            );
          }
        }
        if (expression.operator == 'equal') {
          value = val.value;
        }
      }
      if (val.type == 'field') {
        const keyArr = val.value.split('#');
        let fieldValue: any = 0;
        if (expression.operator == 'equal') {
          fieldValue = '';
        }
        if (store.get(keyArr[0])) {
          if (keyArr.length == 2) {
            fieldValue = store.get(keyArr[0])[keyArr[1]] || 0;
          }
          if (keyArr.length == 1) {
            fieldValue = store.get(keyArr[0]) || 0;
          }
        }
        if (expression.operator == 'subtract') {
          if (value == 0) {
            value = parseFloat(fieldValue);
          } else {
            value -= parseFloat(fieldValue);
          }
        }
        if (expression.operator == 'add') {
          value += parseFloat(fieldValue);
        }
        if (expression.operator == 'multiply') {
          value *= parseFloat(fieldValue);
        }

        if (expression.operator == 'equal') {
          value = fieldValue;
        }
      }
    });
    return value;
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
          workflow.steps.splice(i, 1);
          workflow.steps.splice(updatePositionDto.index, 0, step);
          break;
        }
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
  async updatePosition(updateWorkflowDto: UpdateWorflowDto): Promise<any> {
    return await this.workflowRepository.updatePosition(updateWorkflowDto);
  }
}
