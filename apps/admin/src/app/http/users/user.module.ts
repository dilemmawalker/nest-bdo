import { CoreUserModule } from '@core/users/core-user.module';
import { UserService } from '@core/users/user.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { CaslModule } from '../../../../../../libs/core/auth/src/casl/casl.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    HttpModule,
    CaslModule,
    CoreUserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
