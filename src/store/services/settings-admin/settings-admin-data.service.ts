
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
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class SettingsAdminDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  private readonly ADMIN_VAR_NAME = 'appointmentAdminSettings';

  getSettings(): Observable<ISettingsResponse> {
    const outputSettings: ISettingsResponse = { settingsList: []};
    const settingsBuilder = new SettingsBuilder()
    .buildDefaultSettings();

    return this.http
      .get<{name, value}>(`${restEndpoint}/variables/${this.ADMIN_VAR_NAME}`).map((setting) => {
        outputSettings.settingsList = settingsBuilder
                                      .merge(setting.value)
                                      .toArray();
        return outputSettings;
      })

      .pipe(catchError(this.errorHandler.handleError()));
  }

  getMergedSettings(settingsToMerge) {
    const settingsList = new SettingsBuilder()
    .buildDefaultSettings()
    .merge(settingsToMerge)
    .toArray();
    return settingsList;
  }

  updateSettings(settigsUpdateRequest: ISettingsUpdateRequest) {
      return this.http.put(`${restEndpoint}/variables`, {name: this.ADMIN_VAR_NAME,
                            value: JSON.stringify(settigsUpdateRequest.settingsList) })
                            .map( x => {
                              return settigsUpdateRequest;
                            }).pipe(catchError(this.errorHandler.handleError()));
  }
}
