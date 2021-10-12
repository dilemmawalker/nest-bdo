import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from '../../schemas/stores/store.schema';
import { WorkflowModule } from '../../../../../../libs/core/workflow/core-workflow.module';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';

@Module({
  imports: [
    WorkflowModule,
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreRepository, StoreService],
  exports: [],
})
export class StoreModule {}
