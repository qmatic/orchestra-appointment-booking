import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { calendarEndpoint, qsystemEndpoint, restEndpoint } from '../data.service';
import { ICustomerResponse } from '../../../models/ICustomerResponse';
import { ICustomer } from '../../../models/ICustomer';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import { ILanguageResponse } from '../../../models/ILanguageResponse';
import { ILanguage } from '../../../models/ILanguage';


@Injectable()
export class CustomerDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getCustomers(searchText: string): Observable<ICustomerResponse> {
    if (searchText.indexOf('+') > -1) {
      searchText = encodeURIComponent(searchText);
    }
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

  updateLanguage(language: string, branchId: string, visitId: string): Observable<ICustomer> {
    return this.http
      .put<ICustomer>(`${restEndpoint}/branches/${branchId}/visits/${visitId}/parameters`, language)
      .pipe(
        catchError(this.errorHandler.handleError())
      );
  }
  getLanguage(): Observable<ILanguage[]> {
    return this.http
      .get<ILanguage[]>(`${qsystemEndpoint}/config/applications/notificationservice/variables/groups/languages`)
      .pipe(
        catchError(this.errorHandler.handleError())
      );
  }
}
