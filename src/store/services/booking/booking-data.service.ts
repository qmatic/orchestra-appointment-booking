import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import {
  calendarPublicEndpointV2,
  DataServiceError,
} from '../data.service';

import { IAppointment } from '../../../models/IAppointment';
import { IBookingInformation } from '../../../models/IBookingInformation';


@Injectable()
export class BookingDataService {
  constructor(private http: HttpClient) {}

  /**
   * Confirm appointment.
   * Confirm appointment is the primary way of saving an appointment
   * and needs a reserved appointment to be successful
   * @param appointment Reserved appointment
   */
  confirmAppointment(
    appointment: IAppointment
  ): Observable<IAppointment> {
    const confirmAppointment: IAppointment = {
      title: appointment.title,
      notes: appointment.notes,
      customers: appointment.customers,
      custom: appointment.custom
    };

    return this.http
            .post<IAppointment>(
              `${calendarPublicEndpointV2}`
              + `/branches/appointments/${appointment.publicId}/confirm`, confirmAppointment)
            .pipe(catchError(this.handleError()));
  }

  /**
   * Book appointment.
   * Book appointment is the secondary way of saving an appointment
   * and will be used if the confirm appointment fails because of
   * reservation expirey,
   * @param bookingInformation Information about the booking
   * @param appointment previously reserved appointment
   */
  bookAppointment(
    bookingInformation: IBookingInformation,
    appointment: IAppointment
  ): Observable<IAppointment> {
    const customerPlaceholders = this.getCustomerPlaceholders(bookingInformation.numberOfCustomers);

    const bookAppointment: IAppointment = {
      title: appointment.title,
      notes: appointment.notes,
      customers: [
        ...appointment.customers,
        ...customerPlaceholders
      ],
      services: appointment.services,
      custom: appointment.custom
    };

    return this.http
            .post<IAppointment>(
              `${calendarPublicEndpointV2}`
              + `/branches/${bookingInformation.branchPublicId}`
              + `/dates/${bookingInformation.date}`
              + `/times/${bookingInformation.time}/book/`, bookAppointment
            )
            .pipe(catchError(this.handleError()));
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, res);
      console.error(error);
      return new ErrorObservable(error);
    };
  }

  getCustomerPlaceholders(numberOfCustomers: number) {
    if (numberOfCustomers) {
      const placeholderCustomers = [];
      for (let i = 0; i < numberOfCustomers - 1; i++) {
        placeholderCustomers.push({});
      }
      return placeholderCustomers;
    } else {
      return [];
    }
  }
}
