import { CoreUserModule } from '@core/users/core-user.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { UserController } from './user.controller';

@Module({
  imports: [
    CoreUserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
