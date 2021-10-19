import { CaslModule } from '@core/auth/casl/casl.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Cluster,
  ClusterSchema,
} from '@shared/app/schemas/users/cluster.schema';
import { CoreClusterModule } from 'libs/core/clusters/src/core-cluster.module';
import { ClusterController } from './cluster.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cluster.name, schema: ClusterSchema }]),
    CaslModule,
    CoreClusterModule,
  ],
  controllers: [ClusterController],
})
export class ClusterModule {}
