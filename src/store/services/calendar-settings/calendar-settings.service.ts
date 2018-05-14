import { ICalendarSettingResponse } from './../../../models/ICalendarSettingResponse';
import { ICalendarSetting } from './../../../models/ICalendarSetting';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { calendarEndpoint, DataServiceError } from './../data.service';

@Injectable()
export class CalendarSettingsService {
  constructor(private http: HttpClient) {}

  getSerttingsInfo(): Observable<{ data: ICalendarSetting }> {
    return this.http
      .get<ICalendarSettingResponse>(`${calendarEndpoint}/settings`)
      .map((res: ICalendarSettingResponse) => {
        const reservationTime = res['settingList'][0]['data'].match(
          /"reservationExpiryTimeSeconds"\s*:\s*"(\d*)"/i
        )[1];
        return { data: { reservationExpiryTimeSeconds: reservationTime } };
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
