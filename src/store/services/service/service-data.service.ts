import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import {
  calendarEndpoint,
  calendarPublicEndpoint,
  DataServiceError
} from '../data.service';

import { IServiceResponse } from '../../../models/IServiceResponse';
import { IServiceGroup } from '../../../models/IServiceGroup';
import { IService } from '../../../models/IService';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class ServiceDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getServices(): Observable<IServiceResponse> {
    return this.http
      .get<IServiceResponse>(`${calendarPublicEndpoint}/services/`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  getServiceGroups(servicePublicIds: string): Observable<any> {
    return this.http
      .get<IServiceGroup[]>(`${calendarPublicEndpoint}/services/groups${servicePublicIds}`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
