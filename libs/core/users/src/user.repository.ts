import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Permission,
  PermissionDocument,
} from '@shared/app/schemas/users/permission.schema';
import { User, UserDocument } from '@shared/app/schemas/users/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Permission.name)
    private permissionModel: Model<Permission>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne({ username: userFilterQuery.username });
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return await this.userModel.find({});
  }

  async create(userDto: UserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return await newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { username: userFilterQuery.username },
      user,
      {
        new: true,
      },
    );
  }
}
