import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as AllActions from './../actions';
import { DateDataService } from '../services';

const toAction = AllActions.toAction();

@Injectable()
export class DateEffects {
    constructor(
      private actions$: Actions,
      private dateDataService: DateDataService
    ) {}

    @Effect()
    getDates$: Observable<Action> = this.actions$
      .ofType(AllActions.FETCH_DATES)
      .pipe(
        switchMap((action: AllActions.FetchDates) =>
          toAction(
            this.dateDataService.getDates(action.payload),
            AllActions.FetchDatesSuccess,
            AllActions.FetchDatesFail
          )
        )
      );

    @Effect()
    resetDatesOnBranchChange$: Observable<Action> = this.actions$
      .ofType(AllActions.SELECT_DATE, AllActions.DESELECT_DATE)
      .pipe(
        switchMap(() => {
          return [
            new AllActions.DeselectTimeslot,
            new AllActions.ResetTimeslots
          ];
        })
      );
}
