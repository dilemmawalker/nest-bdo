import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Permission,
  PermissionSchema,
} from '@shared/app/schemas/users/permission.schema';
import { Role, RoleSchema } from '@shared/app/schemas/users/roles.schema';
import { RoleRepository } from 'libs/core/roles/src/role.repository';
import { RoleService } from 'libs/core/roles/src/role.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class CoreRoleModule {}
