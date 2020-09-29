import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { calendarPublicEndpointV2, DataServiceError } from '../data.service';
import { IBookingInformation } from '../../../models/IBookingInformation';
import { IDatesResponse } from '../../../models/IDatesResponse';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class DateDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getDates(bookingInformation: IBookingInformation): Observable<IDatesResponse | any> {
    return this.http
      .get<IDatesResponse>(
        `${calendarPublicEndpointV2}/branches/`
        + `${bookingInformation.branchPublicId}/dates`
        + `${bookingInformation.serviceQuery}`
        + `;numberOfCustomers=${bookingInformation.numberOfCustomers}`
      )
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError()
      ));
  }
}
