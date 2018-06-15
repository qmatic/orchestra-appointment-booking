import { forkJoin } from 'rxjs/observable/forkJoin';

import { Setting } from './../../../models/Setting';
import { ISettingsResponse, ISettingsUpdateRequest } from './../../../models/ISettingsResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, merge, mergeMap, debounceTime } from 'rxjs/operators';
import { calendarEndpoint, restEndpoint, DataServiceError, qsystemEndpoint, applicationId } from '../data.service';
import { SettingsBuilder } from '../../../models/SettingsBuilder';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import { bufferWhen } from 'rxjs/operators/bufferWhen';
import { pipe } from 'rxjs/util/pipe';
import { take } from 'rxjs/operator/take';
import { concatAll } from 'rxjs/operator/concatAll';
import { concatMap } from 'rxjs/operator/concatMap';
import { delay } from 'q';
import { from } from 'rxjs/observable/from';
import { mergeAll } from 'rxjs/operator/mergeAll';
import { Observer } from 'rxjs/Observer';
import { combineAll } from 'rxjs/operators/combineAll';

@Injectable()
export class SettingsAdminDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) { }

  private readonly ADMIN_VAR_NAME = 'appointmentAdminSettings';

  getSettings(): Observable<ISettingsResponse> {
    const outputSettings: ISettingsResponse = { settingsList: [] };
    const settingsBuilder = new SettingsBuilder()
      .buildDefaultSettings();

    return this.http
      .get<{ name, value }>
      (`${qsystemEndpoint}/config/applications/${applicationId}/variables/groups/${this.ADMIN_VAR_NAME}`).map((setting) => {
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
    const updateRequests = Object.keys(settigsUpdateRequest.settingsList).map((key, index) => {
      return this.http.put(`${qsystemEndpoint}/config/applications/${applicationId}/variables/groups/${this.ADMIN_VAR_NAME}/${key}`,
        {
          key: key,
          value: JSON.stringify(settigsUpdateRequest.settingsList[key])
        }
      );
    });

    return forkJoin(updateRequests).map((x: any) => {
      return settigsUpdateRequest;
    }).pipe(catchError(this.errorHandler.handleError()));

  }
}
