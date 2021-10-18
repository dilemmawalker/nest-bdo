import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Cluster,
  ClusterSchema,
} from '@shared/app/schemas/users/cluster.schema';
import { ClusterRepository } from './cluster.repository';
import { ClusterService } from './cluster.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cluster.name, schema: ClusterSchema }]),
  ],
  providers: [ClusterService, ClusterRepository],
  exports: [ClusterRepository, ClusterService],
})
export class CoreClusterModule {}
