import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { AuthModule } from './auth/auth.module';
import { FieldModule } from './fields/field.module';
import { RoleModule } from './roles/role.module';
import { StoreModule } from './stores/store.module';
import { UserModule } from './users/user.module';
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
  ],
  providers: [],
})
export default class HttpModule {}
