import { CaslModule } from '@core/auth/casl/casl.module';
import { CoreUserModule } from '@core/users/core-user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { jwtConfig } from '@shared/config/auth.config';
import { RolesGuard } from 'apps/admin/src/app/guards/roles.guard';
import { RoleModule } from 'apps/admin/src/app/http/roles/role.module';
import { StoreModule } from 'apps/admin/src/app/http/stores/store.module';
import { CoreClusterManagerModule } from 'libs/core/clusterManager/src/core-cluster.manager.module';
import { ClusterManagerController } from './cluster-manager.controller';

@Module({
  imports: [
    CoreUserModule,
    CoreClusterManagerModule,
    CaslModule,
    RoleModule,
    StoreModule,
    JwtModule.register(jwtConfig),
  ],
  controllers: [ClusterManagerController],
  providers: [RolesGuard, JWTUtil],
})
export class ClusterManagerModule {}
