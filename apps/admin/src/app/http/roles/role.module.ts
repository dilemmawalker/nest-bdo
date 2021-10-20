import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Permission,
  PermissionSchema,
} from '@shared/app/schemas/users/permission.schema';
import { Role, RoleSchema } from '@shared/app/schemas/users/roles.schema';
import { CoreRoleModule } from 'libs/core/roles/src/core-role.module';
import { RoleRepository } from '../../../../../../libs/core/roles/src/role.repository';
import { RoleService } from '../../../../../../libs/core/roles/src/role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [
    CoreRoleModule,
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
