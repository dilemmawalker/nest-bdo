import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from '@shared/app/schemas/stores/store.schema';
import { StoreRepository } from 'apps/admin/src/app/http/stores/store.repository';
import { Field, FieldSchema } from '@shared/app/schemas/fields/field.schema';
import { Step, StepSchema } from '@shared/app/schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '@shared/app/schemas/workflows/workflow.schema';
import { WorkflowRepository } from './workflow.repository';
import { Agent, AgentSchema } from '@shared/app/schemas/users/agent.schema';
import { CoreAgentModule } from '../agent/src/core-agent.module';
import { CoreFieldModule } from '../fields/src/core-field.module';
import { WorkflowService } from './workflow.service';
import { CoreActivityModule } from '../activity/core-activity-module';
import {
  Activity,
  ActivitySchema,
} from '@shared/app/schemas/activity/activity.schema';

@Module({
  imports: [
    CoreAgentModule,
    CoreFieldModule,
    CoreActivityModule,
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  providers: [WorkflowService, WorkflowRepository, StoreRepository],
  exports: [WorkflowService, WorkflowRepository],
})
export class CoreWorkflowModule {}
