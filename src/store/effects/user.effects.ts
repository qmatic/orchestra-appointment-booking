import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import * as UserActions from './../actions';
import { UserDataService } from '../services';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';

const toAction = UserActions.toAction();

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private translate: TranslateService,
    private userDataService: UserDataService,
    private errorHanlder: GlobalErrorHandler
  ) {}

  @Effect()
  getUserInfo$: Observable<Action> = this.actions$
    .pipe(
      ofType(UserActions.FETCH_USER_INFO),
      switchMap(() =>
        toAction(
          this.userDataService.getUserInfo(),
          UserActions.FetchUserInfoSuccess,
          UserActions.FetchUserInfoFail
        )
      )
    );

  @Effect({ dispatch: false })
  setLanguage$: Observable<Action> = this.actions$
    .pipe(
      ofType(UserActions.FETCH_USER_INFO_SUCCESS),
      tap((action: UserActions.FetchUserInfoSuccess) => {
        this.translate.use(
          'appointmentBookingMessages' +
            (action.payload.locale === 'en' ? '' : `_${action.payload.locale}`)
        );
      })
    );
}
