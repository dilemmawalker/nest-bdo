import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Field } from '../../shared/app/schemas/fields/field.schema';
import { Workflow } from '../../shared/app/schemas/workflows/workflow.schema';
import { AssignFieldDto } from './dtos/assign-field.dto';
import { FieldsDto } from './dtos/fields.dto';
import { WorkflowDto } from './dtos/workflow.dto';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectModel(Workflow.name) private workflowModel: Model<Workflow>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
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
}
