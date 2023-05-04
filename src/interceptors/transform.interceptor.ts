import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (request.method === 'POST') {
          if (res.statusCode === HttpStatus.CREATED) {
            res.status(HttpStatus.OK);
          }
        }
        return {
          data,
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
