
import { Setting } from './../../../models/Setting';
import { ISettingsResponse, ISettingsUpdateRequest } from './../../../models/ISettingsResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, merge, mergeMap } from 'rxjs/operators';
import { calendarEndpoint, restEndpoint, DataServiceError } from '../data.service';
import { SettingsBuilder } from '../../../models/SettingsBuilder';

@Injectable()
export class SettingsAdminDataService {
  constructor(private http: HttpClient) {}

  private readonly ADMIN_VAR_NAME = 'appointmentAdminSettings';

  getSettings(): Observable<ISettingsResponse> {
    const outputSettings: ISettingsResponse = { settingsList: []};
    const settingsBuilder = new SettingsBuilder()
    .buildDefaultSettings();

    return this.http
      .get<{name, value}>(`${restEndpoint}/variables/${this.ADMIN_VAR_NAME}`).map((setting) => {
        outputSettings.settingsList = settingsBuilder
                                      .patchSettingsArray(setting.value)
                                      .toSettingsArray();
        return outputSettings;
      })

      .pipe(catchError(this.handleError()));
  }

  updateSettings(settigsUpdateRequest: ISettingsUpdateRequest) {
      return this.http.put(`${restEndpoint}/variables`, {name: this.ADMIN_VAR_NAME,
                            value: JSON.stringify(settigsUpdateRequest.settingsList) });
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return new ErrorObservable(error);
    };
  }
}
