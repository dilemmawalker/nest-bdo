import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from '@shared/app/schemas/users/permission.schema';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { FilterQuery, Model } from 'mongoose';
import { RoleDto } from './dtos/role.dto';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name)
    private permissionModel: Model<Permission>,
  ) {}

  async findOne(roleFilterQuery: FilterQuery<Role>): Promise<Role> {
    return await this.roleModel.findOne({ username: roleFilterQuery.username });
  }

  async find(usersFilterQuery: FilterQuery<Role>): Promise<Role[]> {
    return await this.roleModel.find({});
  }

  async create(userDto: RoleDto): Promise<Role> {
    const newUser = new this.roleModel(userDto);
    return await newUser.save();
  }

  async findOneAndUpdate(
    roleFilterQuery: FilterQuery<Role>,
    user: Partial<Role>,
  ): Promise<Role> {
    return await this.roleModel.findOneAndUpdate(
      { username: roleFilterQuery.username },
      user,
      {
        new: true,
      },
    );
  }
}