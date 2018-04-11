import { UserRoleDataService } from './../services/user-role/user-role-data.service';
import { FetchUserRoleInfoFail } from './../actions/user-role.actions';
import { FetchUserRoleInfoSuccess } from './../actions/user-role.actions';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';
import * as AccountActions from './../actions';

const toAction = AccountActions.toAction();

@Injectable()
export class UserRoleEffects {
    constructor(
      private actions$: Actions,
      private userRoleDataService: UserRoleDataService
    ) {}

    @Effect()
    getUserRoleInfo$: Observable<Action> = this.actions$
      .ofType(AccountActions.FETCH_USER_ROLE_INFO)
      .pipe(
        switchMap(() =>
          toAction(
            this.userRoleDataService.getUserRoleInfo(),
            AccountActions.FetchUserRoleInfoSuccess,
            AccountActions.FetchUserRoleInfoFail
          )
        )
      );
}
