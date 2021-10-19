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
    const entity = new LoginUserDto();
    const { user } = userData;
    entity.email = user.email;
    entity.name = user.name;
    entity.mobile = user.mobile;
    entity.username = user.username;
    entity.userId = user.userId;
    entity.agentId = userData.agentId;
    entity.leadUrl = generateWorkflowUrl(
      userData.workflowKey,
      userData.stepId,
      'new',
    );
    return entity;
  }
}
