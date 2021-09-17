import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/app/schemas/users/user.schema";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(userId: string): Promise<User> {
        let user = await this.usersRepository.findOne({ userId });
        if(user){
            console.log(user);
            return user;
        }
        throw new NotFoundException();
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(email: string, age: number): Promise<User> {
        return this.usersRepository.create({
            userId: uuidv4(),
            email,
            age,
            favoriteFoods: []
        })
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}