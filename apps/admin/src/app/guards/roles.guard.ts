import { UserService } from '@core/users/user.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { RoleService } from 'libs/core/roles/src/role.service';
import { ROLES_KEY } from '../decorators/auth/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(request.user.username);
    const roleEntities = await this.roleService.findMany(requiredRoles);
    if (!roleEntities) return false;
    return roleEntities.every((role) =>
      user.roles.some((userRole) => userRole.equals(role._id)),
    );
  }
}
