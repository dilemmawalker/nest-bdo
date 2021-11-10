import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from 'libs/core/notifications/notification.service';
import { NotificationRequest } from './request/notification.request';
import { Notification } from '@shared/app/schemas/notifications/notification.schema';

@ApiTags('Notifications')
@Controller('Notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get('notify')
  async notify(@Param('refId') refId: string): Promise<Notification> {
    return this.notificationService.notify(refId);
  }
}
