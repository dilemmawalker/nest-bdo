import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../../../schemas/users/user.schema";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(private readonly UserRepository: UserRepository) {}

    async getUserById(userId: string): Promise<User> {
        let user = await this.UserRepository.findOne({ userId });
        if(user){
            console.log(user);
            return user;
        }
        throw new NotFoundException();
    }

    async getUsers(): Promise<User[]> {
        return await this.UserRepository.find({});
    }

    async createUser(email: string, age: number): Promise<User> {
        return await this.UserRepository.create({
            userId: uuidv4(),
            email,
            age,
            favoriteFoods: []
        })
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return await this.UserRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}