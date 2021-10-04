import { ApiTags } from '@nestjs/swagger';
import { AuthRequest } from '../../../utils/class/auth.utils';

@ApiTags('Auth')
export class LoginRequest extends AuthRequest {}
