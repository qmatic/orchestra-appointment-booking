import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
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
      .ofType(AllActions.FETCH_BRANCHES)
      .pipe(
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
      .ofType(AllActions.SELECT_BRANCH, AllActions.DESELECT_BRANCH)
      .pipe(
        switchMap(() => {
          return [
            new AllActions.DeselectDate,
            new AllActions.ResetDates
          ];
        })
      );
}
