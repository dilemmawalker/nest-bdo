import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from '@shared/app/schemas/users/agent.schema';
import {
  Permission,
  PermissionSchema,
} from '@shared/app/schemas/users/permission.schema';
import { Role, RoleSchema } from '@shared/app/schemas/users/roles.schema';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class CoreUserModule {}
