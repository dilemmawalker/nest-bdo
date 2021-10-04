import { Routes } from '@nestjs/core';
import { AuthModule } from './http/auth/auth.module';
import { UserModule } from './http/users/user.module';
import { WorkflowModule } from './http/workflow/workflow.module';

const appRoutes: Routes = [
  {
    path: '/api',
    children: [
      { path: '/', module: UserModule },
      { path: '/', module: WorkflowModule },
      { path: '/', module: AuthModule },
    ],
  },
];
export { appRoutes };
