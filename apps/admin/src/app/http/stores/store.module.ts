import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Meeting,
  MeetingSchema,
} from '@shared/app/schemas/meetings/meeting.schema';
import { Store, StoreSchema } from '@shared/app/schemas/stores/store.schema';
import { Agent, AgentSchema } from '@shared/app/schemas/users/agent.schema';
import { CoreStoreModule } from 'libs/core/stores/src/core-store.module';
import { StoreController } from './store.controller';

@Module({
  imports: [
    CoreStoreModule,
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      {
        name: Meeting.name,
        schema: MeetingSchema,
      },
    ]),
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
  ],
  controllers: [StoreController],
})
export class StoreModule {}
