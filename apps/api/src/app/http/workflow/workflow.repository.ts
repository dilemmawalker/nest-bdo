import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { FilterQuery, Model, Types } from 'mongoose';
import { Field } from '../../schemas/fields/field.schema';
import { Workflow } from '../../schemas/workflows/workflow.schema';
import { WorkflowDto } from './dtos/workflow.dto';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectModel(Workflow.name) private workflowModel: Model<Workflow>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) {}

  async findOne(WorkflowFilterQuery: FilterQuery<Workflow>): Promise<Workflow> {
    return await this.workflowModel.findOne(WorkflowFilterQuery);
  }

  async find(WorkflowsFilterQuery: FilterQuery<Workflow>): Promise<Workflow[]> {
    return await this.workflowModel.find(WorkflowsFilterQuery);
  }

  async create(WorkflowDto: WorkflowDto): Promise<Workflow> {
    const newWorkflow = new this.workflowModel(WorkflowDto);
    return await newWorkflow.save();
  }

  async findOneAndUpdate(key: string, fields: Field[]): Promise<Workflow> {
    const workflow = await this.workflowModel.findOne({ key });
    console.log(workflow);
    const fieldRefs = [];
    fields.forEach(async (field) => {
      const fieldModel = new this.fieldModel(field);
      fieldModel.workflow = workflow._id;
      fieldModel._id = new ObjectId();
      const fieldCol = await fieldModel.save();
      fieldRefs.push(fieldCol);
    });
    return workflow;
  }
}
