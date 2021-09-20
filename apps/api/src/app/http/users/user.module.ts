
import { CoreUserModule } from "@core/users/core-user.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@shared/app/schemas/users/user.schema";
import { UserController } from "./user.controller";

@Module({
    imports: [CoreUserModule,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [],
})
export class UserModule { }
