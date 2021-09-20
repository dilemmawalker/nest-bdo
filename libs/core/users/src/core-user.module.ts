import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@shared/app/schemas/users/user.schema";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserService, UserRepository,],
    exports: [UserService,UserRepository]
})
export class CoreUserModule { }