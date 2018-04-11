import { IAccount } from './../../../models/IAccount';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { restEndpoint, DataServiceError } from './../data.service';
import {
  USER_ROLE,
  ADMIN_ROLE,
  NO_ROLE
} from '../../reducers/user-role.reducer';

const STAFF_BOOKING_ROLE = 'Staff Booking';
const STAFF_BOOKING_ADMIN_ROLE = 'Staff Booking Admin';

@Injectable()
export class UserRoleDataService {
  constructor(private http: HttpClient) {}

  getUserRoleInfo(): Observable<string> {
    return this.http
      .get<IAccount>(`${restEndpoint}/account`)
      .map((res: {modules: string[]}) => {
          const isStaffUser = res.modules.filter(module => module === STAFF_BOOKING_ROLE).length > 0 ? true : false;
          const isStaffAdminUser = res.modules.filter(module => module === STAFF_BOOKING_ADMIN_ROLE).length > 0 ? true : false;
          let userRole = NO_ROLE;
          userRole = isStaffUser ? USER_ROLE : userRole;
          userRole = isStaffAdminUser ? ADMIN_ROLE : userRole;
          return userRole;
      })
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
