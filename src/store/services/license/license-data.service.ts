
import {map,  catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


import { qsystemEndpoint, DataServiceError } from '../data.service';
import { ILicense } from './../../../models/ILicense';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

const APPOINTMENT_MANAGER_STANDARD_COMPONENT = 'Appointment Manager Standard';
const APPOINTMENT_MANAGER_PREMIUM_COMPONENT = 'Appointment Manager Premium';

@Injectable()
export class LicenseDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getInfo(): Observable<Object> {
    return this.http
      .get<Object>(`${qsystemEndpoint}/license`).pipe(map((res: {components: [ILicense]}) => {
        const isValidLicense = res.components.reduce((result, next) => {
               if (next.name === APPOINTMENT_MANAGER_STANDARD_COMPONENT || next.name === APPOINTMENT_MANAGER_PREMIUM_COMPONENT) {
                   result = result || (+next.licensedAmount > 0);
               }
               return result;
          }, false);
          return isValidLicense;
      }))
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
