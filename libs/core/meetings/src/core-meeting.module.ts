import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Meeting,
  MeetingSchema,
} from '@shared/app/schemas/meetings/meeting.schema';
import { CoreActivityModule } from 'libs/core/activity/core-activity-module';
import { CoreAgentModule } from 'libs/core/agent/src/core-agent.module';
import { CoreStoreModule } from 'libs/core/stores/src/core-store.module';
import { MeetingRepository } from './meeting.repository';
import { MeetingService } from './meeting.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
    CoreAgentModule,
    CoreActivityModule,
    CoreStoreModule,
  ],
  providers: [MeetingService, MeetingRepository],
  exports: [MeetingService, MeetingRepository],
})
export class CoreMeetingModule {}
