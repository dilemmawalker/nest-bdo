import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Activity,
  ActivitySchema,
} from '@shared/app/schemas/activity/activity.schema';
import { CoreActivityModule } from 'libs/core/activity/core-activity-module';
import { ActivityController } from './activity.controller';

@Module({
  imports: [
    CoreActivityModule,
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  controllers: [ActivityController],
  providers: [],
  exports: [],
})
export class ActivityModule {}
