import { User } from '@shared/app/schemas/users/user.schema';
import { Action } from 'apps/api/src/constant/actions.constant';
import { AppAbility } from '../casl-ability.factory';
import { IPolicyHandler } from './interface/ipolicy.interface';

export class ReadUserPolicy implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User);
  }
}
