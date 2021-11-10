import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Notification } from '@shared/app/schemas/notifications/notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name) private notifModel: Model<Notification>,
  ) {}

  async findOne(
    notifFilterQuery: FilterQuery<Notification>,
  ): Promise<Notification> {
    return await this.notifModel.findOne({ refId: notifFilterQuery.refId });
  }

  async create(refId: string): Promise<Notification> {
    console.log('create printed');
    const newNotif = new this.notifModel();
    newNotif.refId = refId;
    newNotif.type = 'agent';
    newNotif.data = 'You have successfully registered the lead creation.';
    // newNotif.createdOn = new Date(Date.now());
    // newNotif.updatedOn = new Date(Date.now());

    return await newNotif.save();
  }
  async update(notifFilterQuery: FilterQuery<Notification>): Promise<any> {
    // return await this.notifModel.findOneAndUpdate{()}
    //  update: data and updatedOn
    return 'updating';
  }
}
