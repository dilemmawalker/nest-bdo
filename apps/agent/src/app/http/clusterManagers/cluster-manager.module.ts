import { CaslModule } from '@core/auth/casl/casl.module';
import { CoreUserModule } from '@core/users/core-user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { jwtConfig } from '@shared/config/auth.config';
import { RolesGuard } from 'apps/admin/src/app/guards/roles.guard';
import { CoreClusterManagerModule } from 'libs/core/clusterManager/src/core-cluster.manager.module';
import { CoreRoleModule } from 'libs/core/roles/src/core-role.module';
import { CoreStoreModule } from 'libs/core/stores/src/core-store.module';
import { ClusterManagerController } from './cluster-manager.controller';

@Module({
  imports: [
    CoreUserModule,
    CoreClusterManagerModule,
    CaslModule,
    CoreRoleModule,
    CoreStoreModule,
    JwtModule.register(jwtConfig),
  ],
  controllers: [ClusterManagerController],
  providers: [RolesGuard, JWTUtil],
})
export class ClusterManagerModule {}
