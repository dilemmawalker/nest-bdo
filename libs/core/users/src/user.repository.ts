import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDto } from '@shared/app/schemas/users/agent.schema';
import {
  Permission,
  PermissionDocument,
} from '@shared/app/schemas/users/permission.schema';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { User, UserDocument } from '@shared/app/schemas/users/user.schema';
import { RoleDto } from 'libs/core/roles/src/dtos/role.dto';
import { FilterQuery, Model } from 'mongoose';
import { UserDto } from './dtos/user.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  ClusterManager,
  ClusterManagerDto,
} from '@shared/app/schemas/users/cluster.manager.schema';
import { RoleConst } from 'apps/admin/src/constant/auth/roles.constant';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Permission.name)
    private permissionModel: Model<Permission>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Agent.name) private agentModel: Model<Agent>,
    @InjectModel(ClusterManager.name)
    private clusterManagerModel: Model<ClusterManager>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne({
      $or: [
        { username: userFilterQuery.username },
        { mobile: userFilterQuery.mobile },
      ],
    });
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
      {
        $or: [
          { username: userFilterQuery.username },
          { mobile: userFilterQuery.mobile },
        ],
      },
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
    if (role.name === RoleConst.Agent) {
      const newAgent = new this.agentModel(this.getAgentDto(user));
      console.log(newAgent);
      await newAgent.save();
    }
    if (role.name === RoleConst.ClusterManager) {
      const newClusterManager = new this.clusterManagerModel(
        this.getClusterManagerDto(user),
      );
      await newClusterManager.save();
    }
    const userRoles = user.roles ? user.roles : [];
    if (userRoles.indexOf(role._id) != -1) {
      return user;
    }
    userRoles.push(role._id);
    user.roles = [...userRoles];
    await user.save();
    return user;
  }

  private getAgentDto(user: User): AgentDto {
    const entity = new AgentDto();
    entity.agentId = uuidv4();
    entity.userId = user.userId;
    entity.active = true;
    return entity;
  }

  private getClusterManagerDto(user: User): ClusterManagerDto {
    const entity = new ClusterManagerDto();
    entity.clusterManagerId = uuidv4();
    entity.userId = user.userId;
    entity.active = true;
    return entity;
  }
}
