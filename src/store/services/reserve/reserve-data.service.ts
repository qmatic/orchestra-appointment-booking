import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import {
  calendarPublicEndpointV2,
  calendarPublicEndpoint,
  DataServiceError
} from '../data.service';

import { IAppointment } from '../../../models/IAppointment';
import { IBookingInformation } from '../../../models/IBookingInformation';


@Injectable()
export class ReserveDataService {
  constructor(private http: HttpClient) {}

  reserveAppointment(
    bookingInformation: IBookingInformation,
    appointment: IAppointment
  ): Observable<IAppointment> {
    return this.http
            .post<IAppointment>(
              `${calendarPublicEndpointV2}`
              + `/branches/${bookingInformation.branchPublicId}`
              + `/dates/${bookingInformation.date}`
              + `/times/${bookingInformation.time}/reserve/`, appointment
            )
            .pipe(catchError(this.handleError()));
  }

  unreserveAppointment(reservationPublicId: string) {
    return this.http
            .delete<IAppointment>(`${calendarPublicEndpoint}/appointments/${reservationPublicId}`)
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
