import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { AgentModule } from './agents/agent.module';
import { AuthModule } from './auth/auth.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    RouterModule.register(appRoutes),
    AuthModule,
    WorkflowModule,
    AgentModule,
  ],
  providers: [],
})
export default class HttpModule {}
