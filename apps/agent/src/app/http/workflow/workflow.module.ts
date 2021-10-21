import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from '@shared/app/schemas/fields/field.schema';
import { Step, StepSchema } from '@shared/app/schemas/steps/steps.schema';
import {
  Workflow,
  WorkflowSchema,
} from '@shared/app/schemas/workflows/workflow.schema';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { jwtConfig } from '@shared/config/auth.config';
import { CoreFieldModule } from 'libs/core/fields/src/core-field.module';
import { CoreValidationModule } from 'libs/core/validations/src/core-validation.module';
import { CoreWorkflowModule } from 'libs/core/workflow/core-workflow.module';
import { WorkflowController } from './workflow.controller';

@Module({
  imports: [
    CoreWorkflowModule,
    JwtModule.register(jwtConfig),
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
    CoreValidationModule,
    CoreFieldModule,
  ],
  controllers: [WorkflowController],
  providers: [JWTUtil],
})
export class WorkflowModule {}
