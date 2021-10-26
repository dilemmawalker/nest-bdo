import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleDto } from 'libs/core/roles/src/dtos/role.dto';

@ApiTags('Roles')
export class CreateRoleRequest {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  roleId: string;

  static getRoleDto(createRoleRequest: CreateRoleRequest) {
    const roleDto = new RoleDto();
    roleDto.name = createRoleRequest.name;
    roleDto.roleId = createRoleRequest.roleId;
    return roleDto;
  }
}
