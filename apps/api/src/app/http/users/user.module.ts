import { CoreUserModule } from "@app/core/users/user.module";
import { UserRepository } from "@app/core/users/user.repository";
import { UserService } from "@app/core/users/user.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "libs/shared/app/schemas/users/user.schema";
import { UserController } from "./user.controller";

@Module({
    imports: [CoreUserModule,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [],
})
export class UserModule { }
