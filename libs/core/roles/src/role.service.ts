import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { v4 as uuidv4 } from 'uuid';
import { RoleDto } from './dtos/role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findOne(rolename: string): Promise<Role> {
    const Role = await this.roleRepository.findOne({ name: rolename });
    if (Role) {
      return Role;
    }
    throw new NotFoundException();
  }

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find({});
  }

  async createRole(RoleDto: RoleDto): Promise<Role> {
    return await this.roleRepository.create(RoleDto);
  }
}
