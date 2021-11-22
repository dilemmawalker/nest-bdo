import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from '@shared/app/schemas/stores/store.schema';
import { Agent, AgentSchema } from '@shared/app/schemas/users/agent.schema';
import { CoreWorkflowModule } from 'libs/core/workflow/core-workflow.module';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';

@Module({
  imports: [
    CoreWorkflowModule,
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreRepository, StoreService],
  exports: [StoreRepository, StoreService],
})
export class StoreModule {}