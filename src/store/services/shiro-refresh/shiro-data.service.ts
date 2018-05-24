import { GlobalErrorHandler } from './../../../services/util/global-error-handler.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import {
  calendarEndpoint,
  DataServiceError
} from '../data.service';

@Injectable()
export class ShiroDataService {
    constructor(private http: HttpClient, private errorHanlder: GlobalErrorHandler) { }

    refreshShiro(): Observable<any> {
        return this.http
          .get<any>(`${calendarEndpoint}/settings/systemInformation`)
          .pipe(catchError(this.errorHanlder.handleError()));
      }
}
