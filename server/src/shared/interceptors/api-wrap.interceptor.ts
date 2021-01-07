import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class APIWrapInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // changing request
    const request = context.switchToHttp().getRequest();
    if (request.body && request.body.value) {
        request.body = request.body.value;
    }

    return next.handle().pipe(
        // change response
        map(ret => {
            return ret ? {value: ret} : ret;
        }),
    );
  }
}
