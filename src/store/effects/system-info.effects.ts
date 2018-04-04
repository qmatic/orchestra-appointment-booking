import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, mergeMap, catchError, map } from 'rxjs/operators';
import { ISystemInfo } from './../../models/ISystemInfo';
import * as SystemInfoActions from './../actions';

import { SystemInfoDataService, DataServiceError } from '../services';

const toAction = SystemInfoActions.toAction();


@Injectable()
export class SystemInfoEffects {
    constructor(
      private actions$: Actions,
      private http: HttpClient,
      private systemInfoDataService: SystemInfoDataService
    ) {}

    @Effect()
    getSystemInfo$: Observable<Action> = this.actions$
      .ofType(SystemInfoActions.FETCH_USER_INFO)
      .pipe(
        switchMap(() =>
          toAction(
            this.systemInfoDataService.getSystemInfo(),
            SystemInfoActions.FetchSystemInfoSuccess,
            SystemInfoActions.FetchSystemInfoFail
          )
        )
      );
}
