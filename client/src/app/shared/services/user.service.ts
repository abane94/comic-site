import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Observable } from 'rxjs';
import { User } from '../../../../models/user';

@Injectable()
export class UserService {
    private usersUrl = 'api/user/';

    constructor (private http: HttpService) {}

    private handleError(error: any): void {
        console.error('An error ocurred in UserService', error); // for demo purposes only
    }

    public getProfile(id: number): Observable<User> {
        const ob = this.http.get(this.usersUrl + id);
        ob.subscribe(
            resp => {},
            err => {
                this.handleError(err);
            }
        );
        return ob;
    }
}
