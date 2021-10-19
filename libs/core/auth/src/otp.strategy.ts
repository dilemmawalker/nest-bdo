import { ClusterService } from '@core/clusters/cluster.service';
import { UserDto } from '@core/users/dtos/user.dto';
import { UserService } from '@core/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { Strategy } from 'passport-custom';
import { AuthService } from './auth.service';
import { AUTH_FAILURE_MESSAGE } from './message/auth.message';

@Injectable()
export class OtpStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
    private agentService: AgentService,
    private clusterService: ClusterService,
  ) {
    super();
  }
  async validate(payload: any): Promise<any> {
    const { mobile, otp } = payload.body;
    let user = await this.authService.validateUserByOtp(mobile, otp);
    if (!user) {
      throw new UnauthorizedException(AUTH_FAILURE_MESSAGE);
    }
    user = await this.userService.updateOtp(mobile, '');
    const agent = await this.agentService.findAgent(user.userId);
    if (!agent) {
      throw new UnauthorizedException();
    }
    const cluster = await this.clusterService.findOneById(agent.cluster);
    const workflow: any = cluster.onboarding;
    const userPayload = {
      user: user,
      agentId: agent.agentId,
      workflowKey: workflow['key'],
      stepId: workflow['steps'][0]['stepId'],
    };
    const access_token = this.jwtService.sign(userPayload);
    const roles = user.roles;
    return { access_token, roles, userBody: userPayload };
  }
  static getUserDto(otp: string): UserDto {
    const entity = new UserDto();
    entity.otp = otp;
    return entity;
  }
}
