import { AuthResponse } from '../../../utils/class/auth.utils';

export class LoginResponse extends AuthResponse {
  constructor(token: string, roles = []) {
    super();
    this.token = token;
    this.roles = roles;
  }
}
