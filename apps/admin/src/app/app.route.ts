import { Routes } from '@nestjs/core';
import { AgentModule } from './http/agent/agent.module';
import { AuthModule } from './http/auth/auth.module';
import { ClusterModule } from './http/clusters/cluster.module';
import { FieldModule } from './http/fields/field.module';
import { RoleModule } from './http/roles/role.module';
import { StoreModule } from './http/stores/store.module';
import { UserModule } from './http/users/user.module';
import { WorkflowModule } from './http/workflow/workflow.module';

const appRoutes: Routes = [
  {
    path: '/api/admin',
    children: [
      { path: '/', module: UserModule },
      { path: '/', module: WorkflowModule },
      { path: '/', module: AuthModule },
      { path: '/', module: FieldModule },
      { path: '/', module: RoleModule },
      { path: '/', module: StoreModule },
      { path: '/', module: ClusterModule },
      { path: '/', module: AgentModule },
    ],
  },
];
export { appRoutes };
