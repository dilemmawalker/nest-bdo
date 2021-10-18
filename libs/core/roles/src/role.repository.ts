import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from '@shared/app/schemas/users/permission.schema';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { ObjectId } from 'bson';
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
    return await this.roleModel.findOne({ name: roleFilterQuery.name });
  }

  async findMany(roleFilterQuery: FilterQuery<Role>): Promise<Role[]> {
    return await this.roleModel.find({
      name: { $in: roleFilterQuery.roleNames },
    });
  }

  async find(usersFilterQuery: FilterQuery<Role>): Promise<Role[]> {
    return await this.roleModel.find({});
  }

  async create(roleDto: RoleDto): Promise<Role> {
    const newRole = new this.roleModel(roleDto);
    return await newRole.save();
  }

  async findOneAndUpdate(
    roleFilterQuery: FilterQuery<Role>,
    role: Partial<Role>,
  ): Promise<Role> {
    return await this.roleModel.findOneAndUpdate(
      { username: roleFilterQuery.username },
      role,
      {
        new: true,
      },
    );
  }
}
