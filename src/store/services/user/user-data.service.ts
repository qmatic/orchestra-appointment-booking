import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { DataServiceError, restEndpoint } from '../data.service';

import { IUser } from '../../../models/IUser';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getUserInfo(): Observable<IUser> {
    return this.http
      .get<IUser>(`${restEndpoint}/user`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
