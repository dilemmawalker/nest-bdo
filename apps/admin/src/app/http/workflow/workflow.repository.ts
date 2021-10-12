import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { removeItem } from '@shared/app/utils/function/helper.function';
import { FilterQuery, Model } from 'mongoose';
import { Field } from '../../schemas/fields/field.schema';
import { Step } from '../../schemas/steps/steps.schema';
import { Workflow } from '../../schemas/workflows/workflow.schema';
import { AssignFieldDto } from './dtos/assign-field.dto';
import { FieldsDto } from './dtos/fields.dto';
import { StepDto } from './dtos/step.dto';
import { WorkflowDto } from './dtos/workflow.dto';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectModel(Workflow.name) private workflowModel: Model<Workflow>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) { }

  async findOne(WorkflowFilterQuery: FilterQuery<Workflow>): Promise<Workflow> {
    return await this.workflowModel.findOne(WorkflowFilterQuery).populate({
      path: 'steps',
      populate: {
        path: 'fields',
        model: 'Field',
      },
    });
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

  async unassignField(assignFieldDto: AssignFieldDto): Promise<Workflow> {
    const workflow = await this.workflowModel.findOne({
      key: assignFieldDto.workflowKey,
    });
    const field = await this.fieldModel.findOne({
      keyName: assignFieldDto.keyName,
    });
    const steps = workflow.steps;
    for (const i in steps) {
      const element = steps[i];
      if (element.stepId === assignFieldDto.stepId) {
        const fields = [];
        workflow.steps[i].fields.forEach((fo) => {
          if (fo._id != field.id) {
            fields.push(fo);
          }
        });
        steps[i].fields = fields;
        workflow.steps = steps;
        await workflow.update({ steps: steps });
      }
    }
    return await workflow.populate({
      path: 'steps',
      populate: {
        path: 'fields',
        model: 'Field',
      },
    });
  }

  async removeStep(workflowKey: string, stepId: string) {
    const workflow = await this.workflowModel.findOne({
      key: workflowKey,
    });
    const steps = [];
    workflow.steps.forEach((step) => {
      if (step.stepId != stepId) {
        steps.push(step);
      }
    });
    await workflow.update({ steps: steps });

    return workflow.populate({
      path: 'steps',
      populate: {
        path: 'fields',
        model: 'Field',
      },
    });
  }

  async assignField(assignFieldDto: AssignFieldDto): Promise<Workflow> {
    const workflow = await this.workflowModel.findOne({
      key: assignFieldDto.workflowKey,
    });
    const field = await this.fieldModel.findOne({
      keyName: assignFieldDto.keyName,
    });
    const steps = workflow.steps;
    for (const i in steps) {
      const element = steps[i];
      if (element.stepId === assignFieldDto.stepId) {
        steps[i].fields.push(field._id);
        await workflow.update({ steps: steps }).populate({
          path: 'steps',
          populate: {
            path: 'fields',
            model: 'Field',
          },
        });
      }
    }
    return await workflow.populate({
      path: 'steps',
      populate: {
        path: 'fields',
        model: 'Field',
      },
    });
  }

  async addFields(fieldsDto: FieldsDto): Promise<Workflow> {
    const fieldRefs = [];
    const workflow = await this.workflowModel.findOne({
      key: fieldsDto.workflowKey,
    });
    const steps = workflow.steps;
    for (const i in steps) {
      const element = steps[i];
      if (element.stepId === fieldsDto.stepId) {
        fieldsDto.fields.forEach(async (field: Field) => {
          const fieldCol = new this.fieldModel(field);
          await fieldCol.save();
          steps[i].fields.push(fieldCol._id);
          workflow.steps = steps;
          console.log(steps);
          await workflow.update({ steps: steps });
        });
      }
    }
    workflow.position += 1;
    return await this.findOne({ key: workflow.key });
  }

  async addStep(stepDto: StepDto): Promise<Workflow> {
    const workflow = await this.workflowModel.findOne({
      key: stepDto.workflowKey,
    });
    console.log(workflow);
    const step = new Step();
    step.stepId = stepDto.stepId;
    step.name = stepDto.name;
    step.position = stepDto.position;
    step.fields = [];
    workflow.steps.push(step);
    await workflow.save();
    return workflow;
  }
}
function forEach(arg0: (workflow: any) => void) {
  throw new Error('Function not implemented.');
}
