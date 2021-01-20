import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { calendarPublicEndpoint, DataServiceError, calendarEndpoint, appointmentEndPoint, notificationEndpoint } from '../data.service';
import { IAppointmentResponse } from '../../../models/IAppointmentResponse';
import { IAppointment } from '../../../models/IAppointment';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';


@Injectable()
export class AppointmentDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getAppointments(publicId: string): Observable<IAppointmentResponse> {
    return this.http
      .get<IAppointmentResponse>(`${calendarPublicEndpoint}/customers/${publicId}/appointments`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  deleteAppointment(appointment: IAppointment) {
    return this.http
      .delete(`${calendarPublicEndpoint}/appointments/${appointment.publicId}`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  fetchAppointmentQP(appointmentId: string) {
    return this.http
     .get(`${calendarEndpoint}/appointments/publicid/${appointmentId}`).pipe(
        catchError(this.errorHandler.handleError(true))
      );
  }
  fetchAppointmentEmailTemplete(appointmentExternalId: string) {
    return this.http
     .get(`${notificationEndpoint}/getAppointmentConfirmation/?appointment=${appointmentExternalId}`, {responseType: 'text'})
     .pipe(
        catchError(this.errorHandler.handleError(true))
      );
  }

  resendAppointmentConfirmation(appointment: IAppointment) {
    return this.http
     .post(`${notificationEndpoint}/singleAppointment/?appointment=476&notificationType=Email`,{})
     .pipe(
        catchError(this.errorHandler.handleError(true))
      );
  }

  setAppointmentStatEvent(appointment: IAppointment) {
    const statEventBody = {
      'applicationName': 'AppointmentBooking',
      'event': 'CREATE/UPDATE/DELETE'
    };
    return this.http
        .post
        (`${appointmentEndPoint}/branches/${appointment.branch.id}/appointments/${appointment.qpId}/events/APP_ORIGIN`,
        statEventBody)
        .pipe(
            catchError(this.errorHandler.handleError())
        );
  }
}
