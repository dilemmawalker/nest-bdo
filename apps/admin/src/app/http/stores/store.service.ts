import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@shared/app/schemas/users/user.schema';
import { WorkflowRepository } from 'libs/core/workflow/workflow.repository';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '../../schemas/stores/store.schema';
import { Workflow } from '../../schemas/workflows/workflow.schema';
import { WorkflowDto } from '../workflow/dtos/workflow.dto';
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
}
