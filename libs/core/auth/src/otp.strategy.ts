import { ClusterService } from '@core/clusters/cluster.service';
import { UserDto } from '@core/users/dtos/user.dto';
import { UserService } from '@core/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { ClusterManagerService } from 'libs/core/clusterManager/src/cluster.manager.service';
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
    private clusterManagerService: ClusterManagerService,
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
    const clusterManager = await this.clusterManagerService.findOne(
      user.userId,
    );
    if (!agent && !clusterManager) {
      throw new UnauthorizedException();
    }
    let agentPayload = null;
    let clusterManagerPayload = null;
    // If user is a cluster manager
    if (clusterManager) {
      clusterManagerPayload = {
        clusterManagerId: clusterManager.clusterManagerId,
      };
    }
    // If user is an agent
    if (agent) {
      const cluster = await this.clusterService.findOneById(agent.cluster);
      const workflow: any = cluster.onboarding;
      const agentId = agent.agentId;
      agentPayload = {
        agentId,
        workflowKey: workflow['key'],
        stepId: workflow['steps'][0]['stepId'],
      };
    }
    const userPayload = {
      user: user,
      ...agentPayload,
      ...clusterManagerPayload,
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
