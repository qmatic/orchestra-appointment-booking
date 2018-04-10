import { ILicense } from './../../models/ILicense';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { qsystemEndpoint, DataServiceError } from './data.service';

@Injectable()
export class LicenseDataService {
  constructor(private http: HttpClient) {}

  getInfo(): Observable<Object> {
    return this.http
      .get<Object>(`${qsystemEndpoint}/license`).map((res: {components: [ILicense]}) => {
        const isValidLicense = res.components.reduce((result, next) => {
               if (next.name === 'Appointment Manager Standard' || next.name === 'Appointment Manager Premium') {
                   result = result || (+next.licensedAmount > 0);
               }
               return result;
          }, false);
          return isValidLicense;
      })
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
