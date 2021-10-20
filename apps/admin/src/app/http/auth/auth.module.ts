import { CoreAuthModule } from '@core/auth/core-auth.module';
import { Module } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { RoleModule } from '../roles/role.module';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [CoreAuthModule, RoleModule, UserModule],
  controllers: [AuthController],
  providers: [RolesGuard],
})
export class AuthModule {}
