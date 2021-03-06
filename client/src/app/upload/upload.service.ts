import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
import { Observable, Subject } from 'rxjs';

const url = 'api/upload/mult';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(files: Set<File>): [{[key:string]:Observable<number>}, Promise<string[]>] {
    // this will be the our resulting map
    const status = {};
    let urlsRes: (value?: string[] | PromiseLike<string[]>) => void;
    const urlsP = new Promise<string[]>((resolve, reject) => {
      urlsRes = resolve;
    });
    const urls: string[] = []
    let finished = files.size;

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('files', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();


      // send the http-request and subscribe for progress-updates
      this.http.request<{value: string[]}>(req).subscribe(event => {
        console.log('http event : ' + event.type);
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event.type === HttpEventType.Response) {
          // here event.body will contain exactly what was sent by the server, should include list of file urls
          // urlsRes(event.body as string[]);
          urls.push(...event.body.value);
          finished--;
          if (!finished) {
            urlsRes(urls);
          }
          progress.complete();
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          // progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return [status, urlsP];
  }
}
