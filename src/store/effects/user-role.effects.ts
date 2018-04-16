import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as UserRoleActions from './../actions';
import { UserRoleDataService } from './../services';

const toAction = UserRoleActions.toAction();

@Injectable()
export class UserRoleEffects {
    constructor(
      private actions$: Actions,
      private userRoleDataService: UserRoleDataService
    ) {}

    @Effect()
    getUserRoleInfo$: Observable<Action> = this.actions$
      .ofType(UserRoleActions.FETCH_USER_ROLE_INFO)
      .pipe(
        switchMap(() =>
          toAction(
            this.userRoleDataService.getUserRoleInfo(),
            UserRoleActions.FetchUserRoleInfoSuccess,
            UserRoleActions.FetchUserRoleInfoFail
          )
        )
      );
}
