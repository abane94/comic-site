import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Observable } from 'rxjs';

import { Post } from '../../../../models/post';

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
    const ob = this.http.get(this.feedUrl);
    ob.subscribe(
      resp => {},
      err => {
        this.handleError(err);
      }
    );
    return ob;
  }

  public getPost(postID: number): Observable<object> {
    const ob = this.http.get(this.feedUrl + '/' + postID);
    ob.subscribe(
      resp => {},
      err => {
        this.handleError(err);
      }
    );
    return ob;
  }

}
