import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { qsystemEndpoint } from '../data.service';

import { ISystemInfo } from '../../../models/ISystemInfo';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class SystemInfoDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getSystemInfo(): Observable<ISystemInfo> {
    return this.http
      .get<ISystemInfo>(`${qsystemEndpoint}/servicepoint/systemInformation`)
      .pipe(map(
        (data) => {
            if (data['timeConvention']) {
              if (data['timeConvention'] === 'AM/PM') {
                data = {
                  ...data,
                  timeConvention: 'AMPM'
                };
              } else if (data['timeConvention'] === '24 hour') {
                data = {
                  ...data,
                  timeConvention: '24'
                };
              }
            }
            return data;
        }
      ), catchError(this.errorHandler.handleError()));
  }
}
