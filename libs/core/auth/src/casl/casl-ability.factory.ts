import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '@shared/app/schemas/users/user.schema';
import { Action } from '../../../../../apps/admin/src/constant/auth/actions.constant';
import { RoleConst } from '../../../../../apps/admin/src/constant/auth/roles.constant';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    // if (user.roles.indexOf(Role.Admin) != -1) {
    //   can(Action.Manage, 'all'); // read-write access to everything
    // } else {
    //   can(Action.Read, 'all'); // read-only access to everything
    // }

    can(Action.Update, User, { username: user.username });
    // cannot(Action.Delete, Article, { isPublished: true }); #REFERENCE_ONLY

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
