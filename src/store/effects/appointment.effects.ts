import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import * as AppointmentActions from './../actions';
import { AppointmentDataService } from '../services';

const toAction = AppointmentActions.toAction();

@Injectable()
export class AppointmentEffects {
    constructor(
      private actions$: Actions,
      private appointmentDataService: AppointmentDataService
    ) {}

    @Effect()
    getAppointments$: Observable<Action> = this.actions$
      .ofType(AppointmentActions.FETCH_APPOINTMENTS)
      .pipe(
        switchMap((action: AppointmentActions.FetchAppointments) =>
          toAction(
            this.appointmentDataService.getAppointments(action.payload),
            AppointmentActions.FetchAppointmentsSuccess,
            AppointmentActions.FetchAppointmentsFail
          )
        )
      );
}
