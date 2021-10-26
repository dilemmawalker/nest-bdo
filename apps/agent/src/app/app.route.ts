import { Routes } from '@nestjs/core';
import { AgentModule } from './http/agents/agent.module';
import { AuthModule } from './http/auth/auth.module';
import { FileModule } from './http/files/file.module';
import { WorkflowModule } from './http/workflow/workflow.module';

export const appRoutes: Routes = [
  {
    path: 'agent/api/',
    children: [
      { path: '/', module: WorkflowModule },
      { path: '/', module: AuthModule },
      { path: '/', module: AgentModule },
      { path: '/', module: FileModule },
    ],
  },
];
