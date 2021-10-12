import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Permission,
  PermissionSchema,
} from '@shared/app/schemas/users/permission.schema';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class CoreUserModule {}
