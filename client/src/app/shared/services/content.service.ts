import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Observable, throwError } from 'rxjs';

import { Book } from '../../../models';
import { catchError } from 'rxjs/operators';
import { MaturityRating, ViewAccess } from '../../../models';
import { HttpParams } from '@angular/common/http';

// TODO: move the POST, PUT, and DELETE calls into a separate Studio service

@Injectable()
export class ContentService {
  private contentUrl = '';

  constructor(private http: HttpService) { }

  booksUrl = 'api/book/'; // 'data/book/
  seriesUrl = 'api/series/';

  private handleError(error: any): void {
    console.error('An error ocurred ContentService', error); // for demo purposes only
  }

  // CONTENT BOOK

  public newBook(book: Book): Observable<any> {
    // create a new book
    // post : api/v1/content/book/
    // payload : new book details
    // this might take more than this b/c the page arraging and uploading

    return this.http.post(this.booksUrl, book).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  public updateBook(book: Book) : Observable<any> {
    return this.http.put(this.booksUrl, book).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  public getAllBooks(): object {
    // possiblaly not needed

    // once using class return a list of book objects
    // this might not have any pratical purpose
    // get Api/v1/content/book/
    return {};
  }

  // public getBooks(query: string): object{
  //   // change to list of book objects one classes are a thing
  //   // get : api/v1/content/book/query/{query}
  //   // this will be used for search queries alogn with series:153486, creator:465654, user_recommendation:1654
  //   // consider using more specific methods for this endpoint
  //   // return {};
  //   return {'data': this.book_list};
  // }

  public getBooks(
      creator: string | string[],
      maturity: MaturityRating,
      access: ViewAccess,  // TODO: I dont think it makes sense to allow this, maybe just a private boolean?
      limit = 20,
      skip = 0,
      sort: 'TITLE' | 'MATURITY' | 'ACCESS' | 'EDITED' | 'CREATED' = 'CREATED'
    ): Observable<Array<Book>> {
    // if (!query || !query.indexOf('=')) {
    //   query = '';
    // } else {
    //   query = query.trim();
    //   if (query.charAt(0) !== '?') {
    //     query = '?' + query;
    //   }
    // }

    const params = new HttpParams()
      .set('creator', typeof creator === 'string' ? creator : creator.join(','))
      .set('maturity', (maturity || '').toString())
      .set('access', (access || '').toString())
      .set('limit', limit.toString())
      .set('skip', skip.toString())
      .set('sort', sort)

    return this.http.get<Book[]>(this.booksUrl, {params}).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  public getBook(bookID: number): Observable<Book> {
    // change to return book object from book class
    // get : api/v1/content/book/{book id}
    return this.http.get<Book>(this.booksUrl + bookID).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }



  // CONTENT SERIES

  public searchSeries(query: string): Observable<object> {
    // change to list of series objects one classes are a thing
    // get : api/v1/content/series/query/{query}
    // this will be used for search queries alogn with like_series:153486, creator:465654, user_recommendation:1654
    // consider using more specific methods for this endpoint
    if (!query || !query.indexOf('=')) {
      throw new Error('invalid query');
    } else {
      query = query.trim();
      if (query.charAt(0) !== '?') {
        query = '?' + query;
      }
    }
    // not available yet
    return this.http.get<object>(this.seriesUrl + '/' + query).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  public getSeries(seriesID: number): Observable<object> {
    // change to return series object from book class
    // get : api/v1/content/series/{series id}
    return this.http.get<object>(this.booksUrl + seriesID).pipe(
      catchError((err) => {
        this.handleError(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }
}

// {
//   'query': 'query used to fill this grid can be and artist/series/user_suggestions/popular/new/search',
//   'cards': [{list of card data},{},{}],
//   'sort_options': [list of sort options],
//   'sort': 'the selected sort option
// }

// {
//   'thumb_lg': 'path/to/large_thumbnail',      // required - maybe use error image
//   'desc_sh': 'this is the short description', // required - reconsidering
//   'series_name': 'The series name',           // required
//   'iss_num': 1, // maybe required for iss
//   'creator_name': 'Aris Husanu',
//   'creator_num': 123456,                      // required
//   'series_id': 789456,                        // required
//   'book_id': 6549872,     // required for iss
//   // <links for api for likeing / readlater>
// }
