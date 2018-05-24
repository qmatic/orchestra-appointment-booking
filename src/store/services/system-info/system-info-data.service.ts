import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { calendarEndpoint, DataServiceError } from '../data.service';

import { ISystemInfo } from '../../../models/ISystemInfo';
import { ILicenseInfo } from '../../../models/ILicenseInfo';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class SystemInfoDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getSystemInfo(): Observable<ISystemInfo> {
    return this.http
      .get<ISystemInfo>(`${calendarEndpoint}/settings/systemInformation`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
