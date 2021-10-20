import { CoreUserModule } from '@core/users/core-user.module';
import { UserService } from '@core/users/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentSchema } from '@shared/app/schemas/users/agent.schema';
import { User, UserSchema } from '@shared/app/schemas/users/user.schema';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { jwtConfig } from '@shared/config/auth.config';
import { Agent } from 'http';
import { CoreAgentModule } from 'libs/core/agent/src/core-agent.module';
import { CaslModule } from '../../../../../../libs/core/auth/src/casl/casl.module';
import { AgentController } from './agent.controller';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    CoreAgentModule,
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
  ],
  controllers: [AgentController],
  providers: [JWTUtil],
  exports: [],
})
export class AgentModule {}
