import { Module } from '@nestjs/common';
import { AgentRepository } from 'libs/core/agent/src/agent.repository';
import { AgentService } from 'libs/core/agent/src/agent.service';
import { CoreAgentModule } from 'libs/core/agent/src/core-agent.module';
import { AgentController } from './agent.controller';

@Module({
  imports: [CoreAgentModule],
  controllers: [AgentController],
})
export class AgentModule {}
