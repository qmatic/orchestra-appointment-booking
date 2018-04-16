import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as SystemInfoActions from './../actions';
import { SystemInfoDataService } from '../services';

const toAction = SystemInfoActions.toAction();

@Injectable()
export class SystemInfoEffects {
    constructor(
      private actions$: Actions,
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
