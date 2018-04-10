import { FETCH_LICENSE_INFO_FAIL, FetchLicenseInfoSuccess, FetchLicenseFail } from './../actions/license.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, mergeMap, catchError, map } from 'rxjs/operators';
import { ISystemInfo } from './../../models/ISystemInfo';
import * as actions from './../actions';

import { LicenseDataService, DataServiceError } from '../services';

const toAction = actions.toAction();


@Injectable()
export class LicenseInfoEffects {
    constructor(
      private actions$: Actions,
      private http: HttpClient,
      private licenseInfoDataService: LicenseDataService
    ) {}

    @Effect()
    getLicenseInfo$: Observable<Action> = this.actions$
      .ofType(actions.FETCH_LICENSE_INFO)
      .pipe(
        switchMap(() =>
          toAction(
            this.licenseInfoDataService.getInfo(),
            actions.FetchLicenseInfoSuccess,
            actions.FetchLicenseFail
          )
        )
      );
}
