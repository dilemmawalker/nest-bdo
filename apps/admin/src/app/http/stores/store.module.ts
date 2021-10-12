import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreWorkflowModule } from 'libs/core/workflow/core-workflow.module';
import { Store, StoreSchema } from '../../schemas/stores/store.schema';
import { WorkflowModule } from '../workflow/workflow.module';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';

@Module({
  imports: [
    CoreWorkflowModule,
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreRepository, StoreService],
  exports: [StoreRepository, StoreService],
})
export class StoreModule {}
