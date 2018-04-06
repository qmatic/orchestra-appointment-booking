import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { qsystemEndpoint, calendarEndpoint, DataServiceError } from './data.service';

import { ISystemInfo } from '../../models/ISystemInfo';
import { ILicenseInfo } from '../../models/ILicenseInfo';

@Injectable()
export class SystemInfoDataService {
  constructor(private http: HttpClient) {}

  getLicenseInfo(): Observable<ILicenseInfo> {
    return this.http
    .get<ILicenseInfo>(`${qsystemEndpoint}/license/`)
    .pipe(catchError(this.handleError()));
  }

  getSystemInfo(): Observable<ISystemInfo> {
    return this.http
      .get<ISystemInfo>(`${calendarEndpoint}/settings/systemInformation`)
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
