import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { NotificationDto } from 'libs/core/notifications/dtos/notification.dto';

@ApiTags('Notification')
export class NotificationRequest {
  @ApiProperty({ required: true })
  refId: string;

  static notificationDto(
    notificationRequest: NotificationRequest,
  ): NotificationDto {
    const notificationDto = new NotificationDto();
    notificationDto.refId = notificationRequest.refId;
    return notificationDto;
  }
}
