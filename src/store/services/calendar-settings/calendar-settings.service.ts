import { ICalendarSettingResponse } from './../../../models/ICalendarSettingResponse';
import { ICalendarSetting } from './../../../models/ICalendarSetting';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import { calendarEndpoint, DataServiceError } from './../data.service';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class CalendarSettingsService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getSerttingsInfo(): Observable<{ data: ICalendarSetting } | any> {
    return this.http
      .get<ICalendarSettingResponse>(`${calendarEndpoint}/settings/search?group=calendar`)
      .pipe(map((res: ICalendarSettingResponse) => {
        const reservationTime = res['settingList'][0]['data'].match(
          /"reservationExpiryTimeSeconds"\s*:\s*"(\d*)"/i
        )[1];
        return { data: { reservationExpiryTimeSeconds: reservationTime } };
      }))
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
