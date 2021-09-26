import { CoreUserModule } from '@core/users/core-user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { CaslModule } from '../auth/casl/casl.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    CaslModule,
    CoreUserModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<User>('save', function (next) {
            if (!this.createdAt) {
              this.createdAt = new Date();
            }
            console.log('i am called');
            this.updatedAt = new Date();
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
