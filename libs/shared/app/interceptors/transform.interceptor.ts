import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    statusCode: number;
    message: string;
    data: {
        result: T;
        meta: object;
    };
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next
            .handle()
            .pipe(
                map((data) => ({
                    statusCode: data.statusCode || context.switchToHttp().getResponse().statusCode,
                    message: data.message || context.switchToHttp().getResponse().message || "",
                    data: {
                        result: data.result || null,
                        meta: data.meta || {},
                    }
                })),
            );
    }
}