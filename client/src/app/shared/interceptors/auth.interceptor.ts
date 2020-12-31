import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (private auth: AuthenticationService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken();
        if (token) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.auth.getToken()}`,
                },
            });
        }
        

        return next.handle(req);
    }
}