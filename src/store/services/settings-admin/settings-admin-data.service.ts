import { forkJoin } from 'rxjs/observable/forkJoin';
import { Setting } from './../../../models/Setting';
import { ISettingsResponse, ISettingsUpdateRequest } from './../../../models/ISettingsResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, merge, mergeMap, debounceTime, delay, tap } from 'rxjs/operators';
import { calendarEndpoint, restEndpoint, DataServiceError, qsystemEndpoint, applicationId, notificationApplicationId } from '../data.service';
import { SettingsBuilder } from '../../../models/SettingsBuilder';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import { pipe } from 'rxjs/util/pipe';
import { from } from 'rxjs/observable/from';
import { Observer } from 'rxjs/Observer';
import { concat } from 'rxjs/operator/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/concat';

import { combineLatest } from 'rxjs/observable/combineLatest';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { ILanguageSetting } from '../../../models/ILanguageSettings';

@Injectable()
export class SettingsAdminDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) { }

  private readonly ADMIN_VAR_NAME = 'appointmentAdminSettings';
  private readonly NOTI_LANG_GROUP = 'languages';

  getSettings(): Observable<ISettingsResponse> {
    const outputSettings: ISettingsResponse = { settingsList: [] };
    const settingsBuilder = new SettingsBuilder()
      .buildDefaultSettings();

    return this.http
      .get
      (`${qsystemEndpoint}/config/applications/${applicationId}/variables/groups/${this.ADMIN_VAR_NAME}`).map((settings: any) => {
        outputSettings.settingsList = settingsBuilder
          .mergeSettingsWithGet(settings)
          .toArray();
        return outputSettings;
      })
      .pipe(catchError(this.errorHandler.handleError()));
  }

  getLanguages(): Observable<ILanguageSetting[]> {
    let path = `${qsystemEndpoint}/config/applications/${notificationApplicationId}/variables/groups/${this.NOTI_LANG_GROUP}`;
    return this.http
      .get(path)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  getMergedSettings(settingsToMerge) {
    const settingsList = new SettingsBuilder()
      .buildDefaultSettings()
      .mergeSettingsWithGet(settingsToMerge)
      .toArray();
    return settingsList;
  }

  updateSettings(settigsUpdateRequest: ISettingsUpdateRequest) {

    const updateRequests = Object.keys(settigsUpdateRequest.settingsList).map((key, index) => {
      return this.http.put(`${qsystemEndpoint}/config/applications/${applicationId}/variables/groups/${this.ADMIN_VAR_NAME}/${key}`,
        {
          key: key,
          value: String(settigsUpdateRequest.settingsList[key]) === '' ? '-1' : settigsUpdateRequest.settingsList[key]
          // orchestra issue for new api does not allow empty strings
        }
      );
    });

    return Observable.forkJoin(
      Observable.concat(
        updateRequests[0],
        // Observable.timer(500),
        forkJoin(updateRequests.slice(1))
      ))
      .map(
        () => {
          return settigsUpdateRequest;
        }
      )
      .pipe(
        catchError(this.errorHandler.handleError())
      );
  }
}
