import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '@shared/app/schemas/notifications/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notifModel: Model<Notification>,
  ) {}

  async notify(refId: string): Promise<Notification> {
    const newNotif = new this.notifModel();
    newNotif.lastUpdated = new Date(Date.now());
    newNotif.refId = refId;
    newNotif.type = 'agent';
    newNotif.data = 'User details have been added successfully.';
    return newNotif;
  }
}
