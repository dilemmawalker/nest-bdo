import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { JWTUtil } from '@shared/app/utils/class/jwt.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { MeetingService } from 'libs/core/meetings/src/meeting.service';
import { CreateMeetingRequest } from './requests/create-meeting.request';
import { MeetingResponse } from './responses/meeting.response';

@Controller('meetings')
@ApiTags('Meetings')
@ApiBearerAuth()
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @UseInterceptors(TransformInterceptor)
  @Post('/create-or-update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: MeetingResponse,
  })
  async create(
    @Headers('Authorization') auth: string,
    @Body() createMeetingRequest: CreateMeetingRequest,
  ): Promise<any> {
    const json = this.jwtUtil.decode(auth);
    const meeting = await this.meetingService.createOrUpdate(
      CreateMeetingRequest.getMeetingDto(createMeetingRequest, json.agentId),
    );
    return ResponseUtils.success(MeetingResponse.fromMeeting(meeting));
  }
}
