import { Routes } from '@nestjs/core';
import { AuthModule } from './http/auth/auth.module';
import { WorkflowModule } from './http/workflow/workflow.module';

export const appRoutes: Routes = [
  {
    path: 'agent/api/',
    children: [
      { path: '/', module: WorkflowModule },
      { path: '/', module: AuthModule },
    ],
  },
];
