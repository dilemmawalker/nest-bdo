import { SetMetadata } from '@nestjs/common';
import { RoleConst } from '../../../constant/auth/roles.constant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleConst[]) => SetMetadata(ROLES_KEY, roles);
