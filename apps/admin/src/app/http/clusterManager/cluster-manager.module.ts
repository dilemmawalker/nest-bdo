import { Module } from '@nestjs/common';
import { CoreClusterManagerModule } from 'libs/core/clusterManager/src/core-cluster.manager.module';
import { CoreStoreModule } from 'libs/core/stores/src/core-store.module';
import { ClusterManagerController } from './cluster-manager.controller';

@Module({
  imports: [CoreClusterManagerModule],
  controllers: [ClusterManagerController],
})
export class ClusterManagerModule {}
