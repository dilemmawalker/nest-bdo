import { CaslModule } from '@core/auth/casl/casl.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Permission,
  PermissionSchema,
} from '@shared/app/schemas/users/permission.schema';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { Field, FieldSchema } from 'apps/admin/src/app/schemas/fields/field.schema';
import { Step, StepSchema } from 'apps/admin/src/app/schemas/steps/steps.schema';
import { Workflow, WorkflowSchema } from 'apps/admin/src/app/schemas/workflows/workflow.schema';
import { WorkflowRepository } from './workflow.repository';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
  ],
  providers: [WorkflowService, WorkflowRepository],
  exports: [WorkflowService, WorkflowRepository],
})
export class CoreWorkflowModule {}
