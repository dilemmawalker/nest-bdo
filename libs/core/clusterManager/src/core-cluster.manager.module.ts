import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from '@shared/app/schemas/users/agent.schema';
import {
  ClusterManager,
  ClusterManagerSchema,
} from '@shared/app/schemas/users/cluster.manager.schema';
import {
  Cluster,
  ClusterSchema,
} from '@shared/app/schemas/users/cluster.schema';
import { StoreModule } from 'apps/admin/src/app/http/stores/store.module';
import { ClusterManagerRepository } from './cluster.manager.repository';
import { ClusterManagerService } from './cluster.manager.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClusterManager.name, schema: ClusterManagerSchema },
      { name: Cluster.name, schema: ClusterSchema },
      { name: Agent.name, schema: AgentSchema },
    ]),
    StoreModule,
  ],
  providers: [ClusterManagerService, ClusterManagerRepository],
  exports: [ClusterManagerRepository, ClusterManagerService],
})
export class CoreClusterManagerModule {}
