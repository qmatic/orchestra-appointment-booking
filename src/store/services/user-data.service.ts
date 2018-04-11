import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { DataServiceError, restEndpoint } from './data.service';

import { IUser } from '../../models/IUser';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<IUser> {
    return this.http
      .get<IUser>(`${restEndpoint}servicepoint/user`)
      .pipe(catchError(this.handleError()));
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.statusText, requestData);
      console.error(error);
      return new ErrorObservable(error);
    };
  }
}
