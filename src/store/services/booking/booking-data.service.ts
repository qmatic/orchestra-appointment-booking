import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { calendarPublicEndpoint, DataServiceError } from '../data.service';
import { IAppointmentResponse } from '../../../models/IAppointmentResponse';
import { IAppointment } from '../../../models/IAppointment';


@Injectable()
export class BookingDataService {
  constructor(private http: HttpClient) {}

  reserveAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.http
      .get<IAppointment>(`${calendarPublicEndpoint}/customers/${appointment.publicId}/appointments`)
      .pipe(catchError(this.handleError()));
  }

  saveAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.http
      .get<IAppointment>(`${calendarPublicEndpoint}/customers/${appointment.publicId}/appointments`)
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
