import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ClusterManager,
  ClusterManagerSchema,
} from '@shared/app/schemas/users/cluster.manager.schema';
import {
  Cluster,
  ClusterSchema,
} from '@shared/app/schemas/users/cluster.schema';
import { ClusterManagerRepository } from './cluster.manager.repository';
import { ClusterManagerService } from './cluster.manager.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClusterManager.name, schema: ClusterManagerSchema },
      { name: Cluster.name, schema: ClusterSchema },
    ]),
  ],
  providers: [ClusterManagerService, ClusterManagerRepository],
  exports: [ClusterManagerRepository, ClusterManagerService],
})
export class CoreClusterManagerModule {}
