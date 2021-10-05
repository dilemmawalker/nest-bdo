import { Module } from '@nestjs/common';
import { RoleRepository } from '../../../../../../libs/core/roles/src/role.repository';
import { RoleService } from '../../../../../../libs/core/roles/src/role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
