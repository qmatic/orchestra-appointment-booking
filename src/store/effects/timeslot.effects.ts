import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
      .pipe(
        ofType(TimeslotActions.FETCH_TIMESLOTS),
        switchMap((action: TimeslotActions.FetchTimeslots) =>
          toAction(
            this.timeslotDataService.getTimeslots(action.payload),
            TimeslotActions.FetchTimeslotsSuccess,
            TimeslotActions.FetchTimeslotsFail
          )
        )
      );

}
