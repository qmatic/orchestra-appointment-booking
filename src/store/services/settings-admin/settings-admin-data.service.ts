import { Setting } from './../../../models/Setting';
import { ISettingsResponse } from './../../../models/ISettingsResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { calendarEndpoint, restEndpoint, DataServiceError } from '../data.service';
import { SettingsBuilder } from '../../../models/SettingsBuilder';

@Injectable()
export class SettingsAdminDataService {
  constructor(private http: HttpClient) {}

  getSettings(): Observable<ISettingsResponse> {
    return this.http
      .get<Setting[]>(`${restEndpoint}/variables`).map((vars) => {
        const outputSettings: ISettingsResponse = { settingsList: []};
        outputSettings.settingsList = new SettingsBuilder()
                                      .buildDefaultSettings()
                                      .patchSettingsArray(vars)
                                      .toSettingsArray();
        return outputSettings;
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
