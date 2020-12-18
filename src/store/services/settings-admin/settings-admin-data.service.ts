
import {concat ,  forkJoin,  Observable ,  of ,  pipe ,  from ,  Observer ,  combineLatest } from 'rxjs';
import {map,  catchError, merge, mergeMap, debounceTime, delay, tap } from 'rxjs/operators';
import { Setting } from './../../../models/Setting';
import { ISettingsResponse, ISettingsUpdateRequest } from './../../../models/ISettingsResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { calendarEndpoint, restEndpoint, DataServiceError, qsystemEndpoint, applicationId } from '../data.service';
import { SettingsBuilder } from '../../../models/SettingsBuilder';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';



@Injectable()
export class SettingsAdminDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) { }

  private readonly ADMIN_VAR_NAME = 'appointmentAdminSettings';

  getSettings(): Observable<any> {
    const outputSettings: ISettingsResponse = { settingsList: [] };
    const settingsBuilder = new SettingsBuilder()
      .buildDefaultSettings();

    return this.http
      .get
      (`${qsystemEndpoint}/config/applications/${applicationId}/variables/groups/${this.ADMIN_VAR_NAME}`).pipe(map((settings: any) => {
        outputSettings.settingsList = settingsBuilder
          .mergeSettingsWithGet(settings)
          .toArray();
        return outputSettings;
      }))
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
    
    if (updateRequests.length> 1) {
      return forkJoin(
        concat(
          updateRequests[0],
          // Observable.timer(500),
          forkJoin(updateRequests.slice(1))
        )
        ).pipe(
        map(
          () => {
            return settigsUpdateRequest;
          }
        ))
        .pipe(
          catchError(this.errorHandler.handleError())
        );
    } else {
      return forkJoin(
        concat(
          updateRequests[0],
          // Observable.timer(500),
        )
        ).pipe(
        map(
          () => {
            return settigsUpdateRequest;
          }
        ))
        .pipe(
          catchError(this.errorHandler.handleError())
        );
    }

  
  }
}
