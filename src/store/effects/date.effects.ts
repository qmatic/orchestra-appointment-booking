import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';

import * as AllActions from './../actions';
import { DateDataService } from '../services';
import { ToastService } from '../../services/util/toast.service';

const toAction = AllActions.toAction();

@Injectable()
export class DateEffects {
    constructor(
      private actions$: Actions,
      private dateDataService: DateDataService,
      private toastService: ToastService,
      private translateService: TranslateService
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

    @Effect( { dispatch: false })
    checkIfAvailableDates$: Observable<Action> = this.actions$
      .ofType(AllActions.FETCH_DATES_SUCCESS)
      .pipe(
        tap((action: AllActions.FetchDatesSuccess) => {
          if (action.payload.dates.length === 0) {
            this.translateService.get('label.no.dates.available').subscribe(
              (label: string) => this.toastService.errorToast(label)
            ).unsubscribe();
          }
        })
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
