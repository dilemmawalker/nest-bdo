import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from '../../schemas/fields/field.schema';
import { Step, StepSchema } from '../../schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '../../schemas/workflows/workflow.schema';
import { CaslModule } from '../../../../../../libs/core/auth/src/casl/casl.module';
import { WorkflowController } from './workflow.controller';
import { WorkflowRepository } from './workflow.repository';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    CaslModule,
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
  ],
  controllers: [WorkflowController],
  providers: [WorkflowService, WorkflowRepository],
  exports: [WorkflowService, WorkflowRepository],
})
export class WorkflowModule {}
