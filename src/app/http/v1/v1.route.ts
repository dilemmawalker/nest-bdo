import { Routes } from "@nestjs/core";
import { UsersModule } from "./users/users.module";


const v1Routes: Routes = [
    {
        path: '/v1',
        children: [
            { path: '/', module: UsersModule },
        ],
    },
];
export { v1Routes };
