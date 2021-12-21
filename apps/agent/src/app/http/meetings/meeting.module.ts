import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { jwtConfig } from '@shared/config/auth.config';
import { CoreMeetingModule } from 'libs/core/meetings/src/core-meeting.module';
import { MeetingController } from './meeting.controller';

@Module({
  imports: [CoreMeetingModule, JwtModule.register(jwtConfig)],
  controllers: [MeetingController],
  providers: [JWTUtil],
})
export class MeetingModule {}
