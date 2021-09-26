import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from '../../schemas/fields/field.schema';
import {
  Workflow,
  WorkflowSchema,
} from '../../schemas/workflows/workflow.schema';
import { CaslModule } from '../auth/casl/casl.module';
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
  ],
  controllers: [WorkflowController],
  providers: [WorkflowService, WorkflowRepository],
  exports: [],
})
export class WorkflowModule {}
