import { CoreUserModule } from '@core/users/core-user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { PoliciesGuard } from '../../guards/policy.guard';
import { CaslModule } from '../auth/casl/casl.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    CaslModule,
    CoreUserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
