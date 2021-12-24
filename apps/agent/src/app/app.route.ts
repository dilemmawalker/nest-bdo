import { Routes } from '@nestjs/core';
import { ActivityModule } from './http/activity/activity.module';
import { AgentModule } from './http/agents/agent.module';
import { AuthModule } from './http/auth/auth.module';
import { ClusterManagerModule } from './http/clusterManagers/cluster-manager.module';
import { FileModule } from './http/files/file.module';
import { MeetingModule } from './http/meetings/meeting.module';
import { StoreModule } from './http/stores/store.module';
import { UtilityModule } from './http/utility/utility.module';
import { WorkflowModule } from './http/workflow/workflow.module';

export const appRoutes: Routes = [
  {
    path: 'agent/api/',
    children: [
      { path: '/', module: WorkflowModule },
      { path: '/', module: AuthModule },
      { path: '/', module: AgentModule },
      { path: '/', module: FileModule },
      { path: '/', module: ClusterManagerModule },
      { path: '/', module: UtilityModule },
      { path: '/', module: ActivityModule },
      { path: '/', module: MeetingModule },
      { path: '/', module: StoreModule },
    ],
  },
];
