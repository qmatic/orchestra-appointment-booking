import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as AllActions from './../actions';
import { BranchDataService } from '../services';

const toAction = AllActions.toAction();

@Injectable()
export class BranchEffects {
    constructor(
      private actions$: Actions,
      private branchDataService: BranchDataService
    ) {}

    @Effect()
    getBranches$: Observable<Action> = this.actions$
      .pipe(
        ofType(AllActions.FETCH_BRANCHES),
        switchMap(() =>
          toAction(
            this.branchDataService.getBranches(),
            AllActions.FetchBranchesSuccess,
            AllActions.FetchBranchesFail
          )
        )
      );

    @Effect()
    resetDatesOnBranchChange$: Observable<Action> = this.actions$
      .pipe(
        ofType(AllActions.SELECT_BRANCH, AllActions.DESELECT_BRANCH),
        switchMap(() => {
          return [
            new AllActions.DeselectDate,
            new AllActions.ResetDates
          ];
        })
      );
}
