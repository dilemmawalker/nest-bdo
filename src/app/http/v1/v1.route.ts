import { Routes } from "@nestjs/core";
import { UserModule } from "./users/user.module";


const v1Routes: Routes = [
    {
        path: '/v1',
        children: [
            { path: '/', module: UserModule },
        ],
    },
];
export { v1Routes };
