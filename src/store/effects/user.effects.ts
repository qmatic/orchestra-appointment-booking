import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, catchError, tap } from 'rxjs/operators';
import * as UserActions from './../actions';
import { IUser } from './../../models/IUser';
import { UserDataService, DataServiceError } from '../services';

const toAction = UserActions.toAction();

@Injectable()
export class UserEffects {
    constructor(
      private actions$: Actions,
      private translate: TranslateService,
      private userDataService: UserDataService
    ) {}

    @Effect()
    getUserInfo$: Observable<Action> = this.actions$
      .ofType(UserActions.FETCH_USER_INFO)
      .pipe(
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
      .ofType(UserActions.FETCH_USER_INFO_SUCCESS)
      .pipe(
        tap((action: UserActions.FetchUserInfoSuccess) => {
          this.translate.use('staffBookingMessages' + (action.payload.locale === 'en' ? '' : action.payload.locale));
        })
      );
}
