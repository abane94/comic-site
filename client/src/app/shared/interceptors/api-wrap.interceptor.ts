import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class APIWrapInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.body) {
            req = req.clone({
                body: { value: req.body }  // wrap the request in an object, so that other properties can be added and used in interceptors further down the chain
            });
        }

        return next.handle(req).pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    if (event.body) {
                        if (event.body.value) {
                            event = event.clone({ body: event.body.value })
                        }
                    }
                }
                return event;
            })
        );
    }
}
