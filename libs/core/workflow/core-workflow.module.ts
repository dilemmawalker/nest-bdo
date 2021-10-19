<<<<<<< HEAD
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from '@shared/app/schemas/stores/store.schema';
import { StoreRepository } from 'apps/admin/src/app/http/stores/store.repository';
import { Field, FieldSchema } from '@shared/app/schemas/fields/field.schema';
import { Step, StepSchema } from '@shared/app/schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '@shared/app/schemas/workflows/workflow.schema';
=======
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Field,
  FieldSchema,
} from '../../../apps/admin/src/app/schemas/fields/field.schema';
import {
  Step,
  StepSchema,
} from '../../../apps/admin/src/app/schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '../../../apps/admin/src/app/schemas/workflows/workflow.schema';
import { CaslModule } from '../auth/src/casl/casl.module';
import { WorkflowController } from '../../../apps/admin/src/app/http/workflow/workflow.controller';
>>>>>>> 55b3bb4c821b6c515e5ab569bc235e9cc9fd582e
import { WorkflowRepository } from './workflow.repository';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
<<<<<<< HEAD
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  providers: [WorkflowService, WorkflowRepository, StoreRepository],
=======
  ],
  providers: [WorkflowService, WorkflowRepository],
>>>>>>> 55b3bb4c821b6c515e5ab569bc235e9cc9fd582e
  exports: [WorkflowService, WorkflowRepository],
})
export class CoreWorkflowModule {}
