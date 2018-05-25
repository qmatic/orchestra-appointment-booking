import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { calendarEndpoint, DataServiceError } from '../data.service';
import { ICustomerResponse } from '../../../models/ICustomerResponse';
import { IAppointmentResponse } from '../../../models/IAppointmentResponse';
import { ICustomer } from '../../../models/ICustomer';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';


@Injectable()
export class CustomerDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getCustomers(searchText: string): Observable<ICustomerResponse> {
    return this.http
      .get<ICustomerResponse>(`${calendarEndpoint}/customers/searchcustomer?text=${searchText}`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http
      .post<ICustomer>(`${calendarEndpoint}/customers`, customer)
      .pipe(
        catchError(this.errorHandler.handleError()
      ));
  }

  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http
      .put<ICustomer>(`${calendarEndpoint}/customers/${customer.id}`, customer)
      .pipe(
        catchError(this.errorHandler.handleError())
      );
  }
}
