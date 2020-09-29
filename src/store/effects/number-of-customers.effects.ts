import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as AllActions from './../actions';
import { DateDataService } from '../services';

const toAction = AllActions.toAction();

@Injectable()
export class NumberOfCustomersEffects {
    constructor(
      private actions$: Actions,
    ) {}

    @Effect()
    resetBranchesOnNumberOfCustomerChange$: Observable<Action> = this.actions$
      .pipe(
        ofType(AllActions.SET_NUMBER_OF_CUSTOMERS, AllActions.RESET_NUMBER_OF_CUSTOMERS),
        switchMap(() => {
          return [
            new AllActions.DeselectBranch
          ];
        })
      );
}
