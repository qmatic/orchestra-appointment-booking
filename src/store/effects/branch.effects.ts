import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as BranchActions from './../actions';
import { BranchDataService } from '../services';

const toAction = BranchActions.toAction();

@Injectable()
export class BranchEffects {
    constructor(
      private actions$: Actions,
      private branchDataService: BranchDataService
    ) {}

    @Effect()
    getBranches$: Observable<Action> = this.actions$
      .ofType(BranchActions.FETCH_BRANCHES)
      .pipe(
        switchMap(() =>
          toAction(
            this.branchDataService.getBranches(),
            BranchActions.FetchBranchesSuccess,
            BranchActions.FetchBranchesFail
          )
        )
      );
}
