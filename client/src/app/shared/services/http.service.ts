import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService implements OnInit {
    ngOnInit() {

    }

    constructor(private http: HttpClient) {}

    public get(url: string, options?: object): Observable<any> {
        console.log('http service call');
        return this.http.get(url, options);
    }

    public post<T>(url: string, body: Object, options?: object): Observable<T> {
        console.log('http service post call');
        return this.http.post<T>(url, body, options);
    }

    public put<T>(url: string, body: Object, options?: object): Observable<T> {
        console.log('http service put call');
        return this.http.put<T>(url, body, options);
    }
}
