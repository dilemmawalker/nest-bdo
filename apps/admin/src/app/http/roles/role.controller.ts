import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { RoleService } from 'libs/core/roles/src/role.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateRoleRequest } from './requests/create-role.request';
import { RoleResponse } from './responses/role.response';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':rolename')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: RoleResponse,
  })
  async getUser(@Param('rolename') rolename: string): Promise<any> {
    const role = await this.roleService.findOne(rolename);
    return ResponseUtils.success(RoleResponse.fromRole(role));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: RoleResponse,
  })
  @Get()
  async getUsers(@Request() req): Promise<any> {
    const roles = await this.roleService.getRoles();
    return ResponseUtils.success(RoleResponse.fromRoleArray(roles));
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  async createUser(@Body() createRoleRequest: CreateRoleRequest): Promise<any> {
    const role = await this.roleService.createRole(
      CreateRoleRequest.getRoleDto(createRoleRequest),
    );
    return ResponseUtils.success(RoleResponse.fromRole(role));
  }
}
