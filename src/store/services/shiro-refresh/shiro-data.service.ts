import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { DataServiceError } from './../data.service';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ShiroDataService {
    constructor(private http: HttpClient) { }

    refreshShiro(): Observable<any> {
        return this.http
          .get<any>(`/rest/entrypoint/systemInformation`)
          .pipe(catchError(this.handleError()));
      }

      private handleError<T>(requestData?: T) {
        return (res: HttpErrorResponse) => {
          const error = new DataServiceError(res.error, requestData);
          console.error(error);
          return new ErrorObservable(error);
        };
      }
}
