import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreWorkflowModule } from 'libs/core/workflow/core-workflow.module';
<<<<<<< HEAD
import { Field, FieldSchema } from '@shared/app/schemas/fields/field.schema';
import { Step, StepSchema } from '@shared/app/schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '@shared/app/schemas/workflows/workflow.schema';
import { StoreModule } from '../stores/store.module';
=======
import { Field, FieldSchema } from '../../schemas/fields/field.schema';
import { Step, StepSchema } from '../../schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '../../schemas/workflows/workflow.schema';
>>>>>>> 55b3bb4c821b6c515e5ab569bc235e9cc9fd582e
import { WorkflowController } from './workflow.controller';

@Module({
  imports: [
    CoreWorkflowModule,
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
  ],
  controllers: [WorkflowController],
<<<<<<< HEAD
  providers: [],
  exports: [],
=======
>>>>>>> 55b3bb4c821b6c515e5ab569bc235e9cc9fd582e
})
export class WorkflowModule {}
