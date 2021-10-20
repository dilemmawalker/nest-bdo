import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { jwtConfig } from '@shared/config/auth.config';
import { AgentRepository } from 'libs/core/agent/src/agent.repository';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { CoreAgentModule } from 'libs/core/agent/src/core-agent.module';
import { AgentController } from './agent.controller';

@Module({
  imports: [CoreAgentModule, JwtModule.register(jwtConfig)],
  controllers: [AgentController],
  providers: [JWTUtil],
  exports: [JWTUtil],
})
export class AgentModule {}
