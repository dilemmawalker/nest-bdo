import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Permission,
  PermissionDocument,
} from '@shared/app/schemas/users/permission.schema';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { User, UserDocument } from '@shared/app/schemas/users/user.schema';
import { RoleDto } from 'libs/core/roles/src/dtos/role.dto';
import { FilterQuery, Model } from 'mongoose';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Permission.name)
    private permissionModel: Model<Permission>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
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

  async addRole(userId: string, roleDto: RoleDto): Promise<User> {
    const user = await this.userModel.findOne({ userId });
    if (!user) {
      throw new NotFoundException();
    }
    const role = await this.roleModel.findOne({ roleId: roleDto.roleId });
    const userRoles = user.roles ? user.roles : [];
    if (userRoles.indexOf(role._id) != -1) {
      return user;
    }
    userRoles.push(role._id);
    user.roles = [...userRoles];
    await user.save();
    return user;
  }
}
