import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { calendarEndpoint, DataServiceError } from '../data.service';
import { ICustomerResponse } from '../../../models/ICustomerResponse';
import { IAppointmentResponse } from '../../../models/IAppointmentResponse';
import { ICustomer } from '../../../models/ICustomer';


@Injectable()
export class CustomerDataService {
  constructor(private http: HttpClient) {}

  getCustomers(searchText: string): Observable<ICustomerResponse> {
    return this.http
      .get<ICustomerResponse>(`${calendarEndpoint}/customers/searchcustomer?text=${encodeURIComponent(searchText)}`)
      .pipe(catchError(this.handleError()));
  }

  createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http
      .post<ICustomer>(`${calendarEndpoint}/customers`, customer)
      .pipe(catchError(this.handleError()));
  }

  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http
      .put<ICustomer>(`${calendarEndpoint}/customers/${customer.id}`, customer)
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
