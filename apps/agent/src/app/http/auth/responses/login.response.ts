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
    const leadWorkflowKey = '64dd7f50-47d8-4089-b38f-dbc5f5741487';
    const leadStepId = '8add6945-94ab-4257-a615-d6662e1b29fa';
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
