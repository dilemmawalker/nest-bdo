import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@shared/app/schemas/users/user.schema';
import { Role } from 'apps/api/src/constant/auth/roles.constant';
import { v4 as uuidv4 } from 'uuid';
import { Field } from '../../schemas/fields/field.schema';
import { Workflow } from '../../schemas/workflows/workflow.schema';
import { WorkflowDto } from './dtos/workflow.dto';
import { WorkflowRepository } from './workflow.repository';
@Injectable()
export class WorkflowService {
  constructor(private readonly workflowRepository: WorkflowRepository) {}

  async findOne(key: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({ key });
    if (workflow) {
      return workflow;
    }
    throw new NotFoundException();
  }

  async getWorkflows(): Promise<Workflow[]> {
    return await this.workflowRepository.find({});
  }

  async createUser(workflowDto: WorkflowDto): Promise<Workflow> {
    return await this.workflowRepository.create(workflowDto);
  }

  async addFields(key: string, fields: Field[]): Promise<Workflow> {
    return await this.workflowRepository.findOneAndUpdate(key, fields);
  }
}
