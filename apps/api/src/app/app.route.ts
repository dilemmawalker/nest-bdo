import { Routes } from "@nestjs/core";
import { UserModule } from "./http/users/user.module";


const appRoutes: Routes = [
    {
        path: '/api',
        children: [
            { path: '/', module: UserModule },
        ],
    },
];
export { appRoutes };
