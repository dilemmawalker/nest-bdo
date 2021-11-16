import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { AgentModule } from './agent/agent.module';
import { AuthModule } from './auth/auth.module';
import { ClusterManagerModule } from './clusterManager/cluster-manager.module';
import { ClusterModule } from './clusters/cluster.module';
import { FieldModule } from './fields/field.module';
import { RoleModule } from './roles/role.module';
import { StoreModule } from './stores/store.module';
import { UserModule } from './users/user.module';
import { UtilityModule } from './utility/utility.module';
import { ValidationModule } from './validations/validation.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    RouterModule.register(appRoutes),
    UserModule,
    WorkflowModule,
    StoreModule,
    FieldModule,
    RoleModule,
    AuthModule,
    ClusterModule,
    AgentModule,
    ValidationModule,
    ClusterManagerModule,
    UtilityModule,
  ],
  providers: [],
})
export default class HttpModule {}
