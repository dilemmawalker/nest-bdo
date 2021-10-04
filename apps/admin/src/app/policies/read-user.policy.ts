import { User } from '@shared/app/schemas/users/user.schema';
import { Action } from 'apps/admin/src/constant/auth/actions.constant';
import { AppAbility } from '../../../../../libs/core/auth/src/casl/casl-ability.factory';
import { IPolicyHandler } from '../interfaces/auth/ipolicy.interface';

export class ReadUserPolicy implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User);
  }
}
