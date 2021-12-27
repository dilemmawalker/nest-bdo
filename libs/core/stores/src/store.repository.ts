import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meeting } from '@shared/app/schemas/meetings/meeting.schema';
import { Store } from '@shared/app/schemas/stores/store.schema';
import { Agent } from '@shared/app/schemas/users/agent.schema';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { FilterQuery, Model } from 'mongoose';
import { StoreDto } from '../dtos/store.dtos';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    @InjectModel(Agent.name) private agentModel: Model<Agent>,
    @InjectModel(Meeting.name) private meetingModel: Model<Meeting>,
  ) {}

  async create(storeDto: StoreDto): Promise<any> {
    return await new this.storeModel(StoreDto.getStoreObj(storeDto)).save();
  }

  async update(storeDto: StoreDto): Promise<Store> {
    const store = await this.storeModel.findOneAndUpdate(
      {
        $or: [{ storeId: storeDto.storeId }],
      },
      StoreDto.getStoreObj(storeDto),
      {
        new: true,
      },
    );
    return await store;
  }

  async updateObj(obj: any, storeId: string): Promise<Store> {
    const store = await this.storeModel.findOneAndUpdate(
      {
        $or: [{ storeId: storeId }],
      },
      obj,
      {
        new: true,
      },
    );
    return await store;
  }

  async findOne(storeId: string): Promise<any> {
    return await this.storeModel.findOne({ storeId }).populate({
      path: 'createdBy',
      model: 'Agent',
      populate: {
        path: 'user',
        model: 'User',
      },
    });
  }

  async findStoreByWorkflowKey(workflowKey: string): Promise<any> {
    return await this.storeModel.find({ workflowKey });
  }

  async getStores(): Promise<Store[]> {
    return await this.storeModel.find({}).populate({
      path: 'createdBy',
      model: 'Agent',
      populate: {
        path: 'user',
        model: 'User',
      },
    });
  }

  async getMeetings(storeId: string): Promise<any> {
    const store = await this.storeModel.findOne({ storeId }).populate({
      path: 'meetings',
      model: 'Meeting',
    });
    if (!store) {
      return null;
    }
    return store['meetings'].sort((a, b) => {
      return b['createdAt'] - a['createdAt'];
    });
  }

  async getMeetingsByDate(
    storeId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    const store = await this.storeModel.findOne({ storeId });
    if (!store) {
      return null;
    }
    const meetings: Meeting[] = await this.meetingModel.find({
      $and: [
        {
          _id: { $in: store.meetings },
        },
        {
          scheduledAt: { $gte: startDate, $lt: endDate },
        },
      ],
    });
    return meetings;
  }
}
