import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { calendarEndpoint, DataServiceError } from './data.service';

import { IBranch } from '../../models/IBranch';

@Injectable()
export class BranchDataService {
  constructor(private http: HttpClient) {}

  getBranches(): Observable<IBranch[]> {
    return this.http
      .get<IBranch[]>(`${calendarEndpoint}/settings/systemInformation`)
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
