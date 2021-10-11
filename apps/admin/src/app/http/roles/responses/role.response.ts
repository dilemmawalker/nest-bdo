import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Role } from '@shared/app/schemas/users/roles.schema';

@ApiTags('Roles')
export class RoleResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  roleId: string;

  static fromRole(role: Role) {
    const entity = new RoleResponse();
    entity.name = role.name;
    entity.roleId = role.roleId;
    return entity;
  }

  static fromRoleArray(roles: Role[]): RoleResponse[] {
    const entities = [];
    roles.forEach((role) => {
      entities.push(this.fromRole(role));
    });
    return entities;
  }
}
