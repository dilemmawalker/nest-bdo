import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Role } from '@shared/app/schemas/users/roles.schema';
import { RoleDto } from 'libs/core/roles/src/dtos/role.dto';

@ApiTags('User')
export class AddRoleRequest {
  @ApiProperty({ required: true })
  roleId: string;

  @ApiProperty({ required: true })
  userId: string;

  static getRoleDto(addRoleRequest: AddRoleRequest): RoleDto {
    const entity = new RoleDto();
    entity.roleId = addRoleRequest.roleId;
    return entity;
  }
}
