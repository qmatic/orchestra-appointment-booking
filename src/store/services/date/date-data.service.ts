import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { calendarPublicEndpointV2, DataServiceError } from '../data.service';
import { IBookingInformation } from '../../../models/IBookingInformation';
import { IDatesResponse } from '../../../models/IDatesResponse';

@Injectable()
export class DateDataService {
  constructor(private http: HttpClient) {}

  getDates(bookingInformation: IBookingInformation): Observable<IDatesResponse> {
    return this.http
      .get<IDatesResponse>(
        `${calendarPublicEndpointV2}/branches/`
        + `${bookingInformation.branchPublicId}/dates`
        + `${bookingInformation.serviceQuery}`
        + `;numberOfCustomers=${bookingInformation.numberOfCustomers}`
      )
      .pipe(
        retry(3),
        catchError(this.handleError()
      ));
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return new ErrorObservable(error);
    };
  }
}
