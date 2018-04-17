import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';

import * as AppointmentActions from './../actions';
import { AppointmentDataService, DataServiceError } from '../services';

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

    @Effect()
    deleteAppointment$: Observable<Action> = this.actions$
      .ofType(AppointmentActions.DELETE_APPOINTMENT)
      .pipe(
        switchMap((action: AppointmentActions.DeleteAppointment) =>
          this.appointmentDataService.deleteAppointment(action.payload).pipe(
            mergeMap(() => [new AppointmentActions.DeleteAppointmentSuccess(action.payload)]),
            catchError((err: DataServiceError<any>) => of(new AppointmentActions.DeleteAppointmentFail(err))),
          )
        )
      );
}
