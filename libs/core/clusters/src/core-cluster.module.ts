import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Cluster,
  ClusterSchema,
} from '@shared/app/schemas/users/cluster.schema';
import {
  Workflow,
  WorkflowSchema,
} from '@shared/app/schemas/workflows/workflow.schema';
import { ClusterRepository } from './cluster.repository';
import { ClusterService } from './cluster.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cluster.name, schema: ClusterSchema }]),
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
  ],
  providers: [ClusterService, ClusterRepository],
  exports: [ClusterRepository, ClusterService],
})
export class CoreClusterModule {}
