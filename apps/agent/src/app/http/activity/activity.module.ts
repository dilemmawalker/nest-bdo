import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Activity,
  ActivitySchema,
} from '@shared/app/schemas/activity/activity.schema';
import { StoreModule } from 'apps/admin/src/app/http/stores/store.module';
import { ActivityRepository } from 'libs/core/activity/activity.repository';
import { CoreActivityModule } from 'libs/core/activity/core-activity-module';
import { CoreAgentModule } from 'libs/core/agent/src/core-agent.module';
import { ActivityController } from './activity.controller';

@Module({
  imports: [
    CoreActivityModule,
    StoreModule,
    CoreAgentModule,
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  controllers: [ActivityController],
  providers: [],
  // providers: [ActivityRepository], //repo to remove maybe
  exports: [],
})
export class ActivityModule {}
