import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Observable, throwError } from 'rxjs';
import { User } from '../../../models';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
    private usersUrl = 'api/user/';

    constructor(private http: HttpService) { }

    private handleError(error: any): void {
        console.error('An error ocurred in UserService', error); // for demo purposes only
    }

    public getProfile(id: number): Observable<User> {
        return this.http.get<User>(this.usersUrl + id).pipe(
            catchError((err) => {
                this.handleError(err);

                //Handle the error here

                return throwError(err);    //Rethrow it back to component
            })
        );
    }
}
