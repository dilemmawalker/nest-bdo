import { UserDto } from '@core/users/dtos/user.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/app/schemas/users/user.schema';
import { generateWorkflowUrl } from '@shared/app/utils/function/helper.function';
import { Types } from 'mongoose';
import { LoginUserDto } from '../dtos/login-user.dto';

@ApiTags('Auth')
export class LoginResponse {
  constructor(token: string, user: LoginUserDto) {
    this.token = token;
    this.user = user;
  }
  @ApiProperty({ required: true })
  token: string;

  @ApiProperty()
  user: LoginUserDto;

  static fromUser(userData: any): LoginUserDto {
    const leadWorkflowKey =
      process.env.DEFAULT_STORE_LEAD_WORKFLOW ||
      'd02854e3-c19f-48b0-90d8-4eda96781f60';
    const leadStepId =
      process.env.DEFAULT_STORE_LEAD_STEP_ID ||
      '789036ff-e8fd-410d-94e6-b7fe641618fa';
    const entity = new LoginUserDto();
    const { user } = userData;
    entity.email = user.email;
    entity.name = user.name;
    entity.mobile = user.mobile;
    entity.username = user.username;
    entity.userId = user.userId;
    entity.agentId = userData.agentId;
    entity.clusterManagerId = userData.clusterManagerId;
    entity.leadUrl = generateWorkflowUrl(leadWorkflowKey, leadStepId, 'new');
    return entity;
  }
}
