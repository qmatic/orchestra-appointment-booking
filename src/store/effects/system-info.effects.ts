import { ISystemInfo } from './../../models/ISystemInfo';
import { Action } from '@ngrx/store/src/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as systemInfoActions from './../actions/system-info.actions';
import { Effect, Actions } from '@ngrx/effects';

@Injectable()
export class SystemInfoEffects {
    constructor(private actions$: Actions, private http: HttpClient) {
    }

    @Effect()
    getUsers$ = this.actions$
        .ofType(systemInfoActions.FETCH_SYSTEM_INFO)
        .switchMap((action) => this.http.get('/calendar-backend/api/v1/settings/systemInformation'))
        .mergeMap((systemInfo:ISystemInfo) => {
            return [{type: systemInfoActions.FETCH_SYSTEM_INFO_SUCCESS, payload: systemInfo}]
        })
        .catch(err => [{ type: systemInfoActions.FETCH_SYSTEM_INFO_FAIL, payload: err }]);
}