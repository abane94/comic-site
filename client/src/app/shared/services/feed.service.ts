import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Observable, throwError } from 'rxjs';

import { Post } from '../../../models';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FeedService {

  constructor(private http: HttpService) { }

  feedUrl = 'api/feed/';

  private handleError(error: any): void {
    console.error('An error ocurred in FeedService', error); // for demo purposes only
  }


  public getFeed(query: String): Observable<Array<Post>> {
    if (!query || !query.indexOf('=')) {
      query = '';
    } else {
      query = query.trim();
      if (query.charAt(0) !== '?') {
        query = '?' + query;
      }
    }
    return this.http.get<Post[]>(this.feedUrl).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  public getPost(postID: number): Observable<object> {
    return this.http.get<object>(this.feedUrl + '/' + postID).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

}
