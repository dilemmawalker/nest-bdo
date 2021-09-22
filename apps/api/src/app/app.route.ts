import { Routes } from '@nestjs/core';
import { AuthModule } from './http/auth/auth.module';
import { UserModule } from './http/users/user.module';

const appRoutes: Routes = [
  {
    path: '/api',
    children: [
      { path: '/', module: UserModule },
      { path: '/', module: AuthModule },
    ],
  },
];
export { appRoutes };
