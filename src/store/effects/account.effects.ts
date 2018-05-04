import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';

import * as AccountActions from './../actions';
import { AccountDataService } from '../services';

const toAction = AccountActions.toAction();

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private translate: TranslateService,
    private accountDataService: AccountDataService
  ) {}

  @Effect()
  getAccountInfo$: Observable<Action> = this.actions$
    .ofType(AccountActions.FETCH_ACCOUNT_INFO)
    .pipe(
      switchMap(() =>
        toAction(
          this.accountDataService.getAccountInfo(),
          AccountActions.FetchAccountInfoSuccess,
          AccountActions.FetchAccountInfoFail
        )
      )
    );

  @Effect({ dispatch: false })
  setLanguage$: Observable<Action> = this.actions$
    .ofType(AccountActions.FETCH_ACCOUNT_INFO_SUCCESS)
    .pipe(
      tap((action: AccountActions.FetchAccountInfoSuccess) => {
        this.translate.use(
          'appointmentBookingMessages' +
            (action.payload.data.locale === 'en'
              ? ''
              : `_${action.payload.data.locale}`)
        );
      })
    );
}
