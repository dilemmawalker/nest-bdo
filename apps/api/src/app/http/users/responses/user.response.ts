import { User } from "libs/shared/app/schemas/users/user.schema";


export class UserResponse {
  userId: string;
  email: string;

  static fromUser(user: User) {
    const entity = new UserResponse();
    entity.userId = user.userId;
    entity.email = user.email;
    return entity;
  }

  static fromUserArray(users: User[]): UserResponse[] {
    const entities = [];
    users.forEach(user => {
        entities.push(this.fromUser(user));
    });
    return entities;
  }
}
