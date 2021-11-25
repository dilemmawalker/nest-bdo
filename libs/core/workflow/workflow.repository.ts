import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateWorkflow } from '@shared/app/schemas/workflows/updateWorkflow.schema';
import { removeItem } from '@shared/app/utils/function/helper.function';

import { FilterQuery, Model } from 'mongoose';
import path from 'path';
import { Field } from '../../shared/app/schemas/fields/field.schema';
import { Workflow } from '../../shared/app/schemas/workflows/workflow.schema';
import { FieldDto } from '../fields/src/dtos/field.dto';
import { AssignFieldDto } from './dtos/assign-field.dto';
import { FieldsDto } from './dtos/fields.dto';

import { StepDto } from './dtos/step.dto';
import { UpdateWorflowDto } from './dtos/updateWorkflow.dto';

import { WorkflowDto } from './dtos/workflow.dto';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectModel(Workflow.name) private workflowModel: Model<Workflow>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(UpdateWorkflow.name)
    private updateModel: Model<UpdateWorkflow>,
  ) {}

  async findOne(key: string): Promise<Workflow> {
    return await this.workflowModel.findOne({ key }).populate({
      path: 'steps',
      populate: {
        path: 'fields',
        model: 'Field',
        populate: {
          path: 'groups',
          model: 'Field',
        },
      },
    });
  }

  async findOneWithoutPopulate(key: string): Promise<Workflow> {
    return await this.workflowModel.findOne({ key });
  }

  async find(WorkflowsFilterQuery: FilterQuery<Workflow>): Promise<Workflow[]> {
    const data = await this.workflowModel.find({}).populate({
      path: 'steps',
      populate: {
        path: 'fields',
        model: 'Field',
      },
    });
    return data;
  }

  async create(WorkflowDto: WorkflowDto): Promise<Workflow> {
    const newWorkflow = new this.workflowModel(WorkflowDto);
    return await newWorkflow.save();
  }

  async updateObj(obj: any, key: string): Promise<Workflow> {
    const workflow = await this.workflowModel.findOneAndUpdate({ key }, obj);
    return await this.findOne(workflow.key);
  }

  async updatePosition(updateWorkflowDto: UpdateWorflowDto): Promise<any> {
    const workflow = await this.workflowModel.findOne({
      key: updateWorkflowDto.workFlowKey,
    });
    const steps = workflow.steps;

    let temp;
    let fields;
    for (let i = 0; i < steps.length; i++) {
      const ele = steps[i];
      if (ele.stepId === updateWorkflowDto.stepId) {
        fields = ele.fields;
        for (let j = 0; j < fields.length; j++) {
          const e = fields[j];
          if (e._id.equals(updateWorkflowDto.fieldId)) {
            temp = fields[j];
            const index = updateWorkflowDto.index;
            const data = fields.splice(j, 1);
            fields.splice(index, 0, temp);
            workflow.steps[i].fields = fields;
            await workflow.updateOne({ steps: steps });
            break;
          }
        }
        break;
      }
    }
    return workflow.populate({
      path: 'steps',
    });
  }
}
