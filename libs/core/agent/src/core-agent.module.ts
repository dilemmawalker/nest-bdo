import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from '@shared/app/schemas/users/agent.schema';
import {
  Cluster,
  ClusterSchema,
} from '@shared/app/schemas/users/cluster.schema';
import { jwtConfig } from '@shared/config/auth.config';
import { AgentRepository } from './agent.repository';
import { AgentService } from './agent.service';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    MongooseModule.forFeature([
      { name: Agent.name, schema: AgentSchema },
      { name: Cluster.name, schema: ClusterSchema },
    ]),
  ],
  providers: [AgentService, AgentRepository],
  exports: [AgentService, AgentRepository],
})
export class CoreAgentModule {}
