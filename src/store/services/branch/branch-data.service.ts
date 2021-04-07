import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { calendarPublicEndpoint, DataServiceError,calendarEndpoint } from '../data.service';

import { IBranchResponse } from '../../../models/IBranchResponse';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class BranchDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getBranches(): Observable<any> {
    return this.http
      .get<IBranchResponse>(`${calendarPublicEndpoint}/branches/`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
 
  getQPBranches() : Observable<any> {
    return this.http
      .get<IBranchResponse>(`${calendarEndpoint}/branches/`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
