import { Role } from '@shared/app/schemas/users/roles.schema';

export class RoleResponse {
  name: string;

  static fromRole(role: Role) {
    const entity = new RoleResponse();
    entity.name = role.name;
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
