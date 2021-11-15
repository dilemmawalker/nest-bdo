import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Activity,
  ActivitySchema,
} from '@shared/app/schemas/activity/activity.schema';
import { Store, StoreSchema } from '@shared/app/schemas/stores/store.schema';
import { StoreModule } from 'apps/admin/src/app/http/stores/store.module';
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
  exports: [],
})
export class ActivityModule {}
