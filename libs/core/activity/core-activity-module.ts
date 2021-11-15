import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Activity,
  ActivitySchema,
} from '@shared/app/schemas/activity/activity.schema';
import { StoreRepository } from 'apps/admin/src/app/http/stores/store.repository';
import { ActivityRepository } from './activity.repository';
import { ActivityService } from './activity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService, ActivityRepository],
})
export class CoreActivityModule {}
