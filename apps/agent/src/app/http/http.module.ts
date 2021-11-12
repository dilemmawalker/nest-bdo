import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { ActivityModule } from './activity/activity.module';
import { AgentModule } from './agents/agent.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './files/file.module';
import { UtilityModule } from './utility/utility.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    RouterModule.register(appRoutes),
    AuthModule,
    WorkflowModule,
    AgentModule,
    FileModule,
    UtilityModule,
    ActivityModule,
  ],
  providers: [],
})
export default class HttpModule {}
