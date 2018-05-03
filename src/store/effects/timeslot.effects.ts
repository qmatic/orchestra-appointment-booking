import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as TimeslotActions from './../actions';
import { TimeslotDataService } from '../services';

const toAction = TimeslotActions.toAction();

@Injectable()
export class TimeslotEffects {
    constructor(
      private actions$: Actions,
      private timeslotDataService: TimeslotDataService,
    ) {}

    @Effect()
    getTimeslots$: Observable<Action> = this.actions$
      .ofType(TimeslotActions.FETCH_TIMESLOTS)
      .pipe(
        switchMap((action: TimeslotActions.FetchTimeslots) =>
          toAction(
            this.timeslotDataService.getTimeslots(action.payload),
            TimeslotActions.FetchTimeslotsSuccess,
            TimeslotActions.FetchTimeslotsFail
          )
        )
      );
}
