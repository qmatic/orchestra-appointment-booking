import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import * as LicenseActions from './../actions';
import { LicenseDataService, DataServiceError } from '../services';

const toAction = LicenseActions.toAction();


@Injectable()
export class LicenseInfoEffects {
    constructor(
      private actions$: Actions,
      private licenseInfoDataService: LicenseDataService
    ) {}

    @Effect()
    getLicenseInfo$: Observable<Action> = this.actions$
      .pipe(
        ofType(LicenseActions.FETCH_LICENSE_INFO),
        switchMap(() =>
          toAction(
            this.licenseInfoDataService.getInfo(),
            LicenseActions.FetchLicenseInfoSuccess,
            LicenseActions.FetchLicenseFail
          )
        )
      );
}
