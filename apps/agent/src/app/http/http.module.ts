import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from '../app.route';
import { ActivityModule } from './activity/activity.module';
import { AgentModule } from './agents/agent.module';
import { AuthModule } from './auth/auth.module';
import { ClusterManagerModule } from './clusterManagers/cluster-manager.module';
import { FileModule } from './files/file.module';
import { MeetingModule } from './meetings/meeting.module';
import { StoreModule } from './stores/store.module';
import { UtilityModule } from './utility/utility.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    RouterModule.register(appRoutes),
    AuthModule,
    WorkflowModule,
    AgentModule,
    ClusterManagerModule,
    FileModule,
    UtilityModule,
    ActivityModule,
    MeetingModule,
    StoreModule,
  ],
  providers: [],
})
export default class HttpModule {}
