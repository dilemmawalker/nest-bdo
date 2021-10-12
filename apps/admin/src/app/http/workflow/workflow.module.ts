import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreWorkflowModule } from 'libs/core/workflow/core-workflow.module';
import { Field, FieldSchema } from '../../schemas/fields/field.schema';
import { Step, StepSchema } from '../../schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '../../schemas/workflows/workflow.schema';
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
})
export class WorkflowModule {}
