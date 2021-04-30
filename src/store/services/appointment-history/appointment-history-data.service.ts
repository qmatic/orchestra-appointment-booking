import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { calendarPublicEndpoint, DataServiceError, calendarEndpoint, appointmentEndPoint, notificationEndpoint,qsystemEndpoint, queueingHistoryEndpoint } from '../data.service';
import { IAppointmentResponse } from '../../../models/IAppointmentResponse';
import { IAppointment } from '../../../models/IAppointment';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import { IAppointmentQPResponse } from '../../../models/IAppointmentQPResponse';
import { IAppointmentVisit } from '../../../models/IAppointmentVisit';


@Injectable()
export class AppointmentHistoryDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) { }

  getActionAppointments(publicId: string): Observable<IAppointmentResponse> {
    return this.http
      .get<IAppointmentResponse>(`${calendarPublicEndpoint}/customers/${publicId}/appointmentActions`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  getAppointmentById(id: number): Observable<IAppointmentResponse> {
    return this.http
      .get<IAppointmentResponse>(`${calendarEndpoint}/appointments/${id}`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  getAppointmentVisit(qpId: number): Observable<IAppointmentVisit> {
    return this.http
      .get<IAppointmentVisit>(`${queueingHistoryEndpoint}?appointmentId=${qpId}`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
  
}
