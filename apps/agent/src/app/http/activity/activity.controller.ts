import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { StoreRepository } from 'apps/admin/src/app/http/stores/store.repository';
import { ActivityRepository } from 'libs/core/activity/activity.repository';
import { ActivityResponseDto } from './dtos/activity.response.dto';
import { AgentRepository } from 'libs/core/agent/src/agent.repository';

ApiTags('activity-log');
@Controller('activity-log')
export class ActivityController {
  constructor(
    private readonly activityRepo: ActivityRepository,
    private readonly storeRepository: StoreRepository,
    private readonly agentRepository: AgentRepository,
  ) {}

  @Get(':storeId')
  async get(@Param('storeId') subject_id: string): Promise<any> {
    const data = await this.activityRepo.findAll(subject_id);

    const n = data.length;
    const arr = [];
    for (let i = 0; i < n; i++) {
      const temp = new ActivityResponseDto();

      const d = data[i];
      let s1 = '';
      let s2 = '';
      let s3 = '';
      const ts = d.created_at.getTime();
      const date = new Date(ts);

      s2 +=
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear().toString().substring(2);

        s3 += date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

      const store_name = await this.storeRepository.findOne(d.subject_id);
      // const agent_name = await this.agentRepository.getAgent(d.causer_id);
      s1 = store_name.store_name;
      if (d.description == 'Created') {
        s1 += '- Lead created by ';
      } else {
        s1 += '- updated by ';
      }
      // s1 += agent_name;
      s1 += 'Agent';
      temp.Activity = s1;
      temp.Date = s2;
      temp.Time = s3;
      arr.push(temp);
    }
    return arr;
  }
}
