import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';

import * as ReserveActions from './../actions';
import { ReserveDataService } from '../services';
import { ToastService } from '../../services/util/toast.service';

const toAction = ReserveActions.toAction();

@Injectable()
export class ReserveEffects {
    constructor(
      private actions$: Actions,
      private reserveDataService: ReserveDataService,
      private toastService: ToastService
    ) {}

    @Effect()
    reserveAppointment$: Observable<Action> = this.actions$
      .ofType(ReserveActions.RESERVE_APPOINTMENT)
      .pipe(
        switchMap((action: ReserveActions.ReserveAppointment) =>
          toAction(
            this.reserveDataService.reserveAppointment(
              action.payload.bookingInformation,
              action.payload.appointment
            ),
            ReserveActions.ReserveAppointmentSuccess,
            ReserveActions.ReserveAppointmentFail
          )
        )
      );

    @Effect({ dispatch: false })
    reserveAppointmentFailed$: Observable<Action> = this.actions$
      .ofType(ReserveActions.RESERVE_APPOINTMENT_FAIL)
      .pipe(
        tap(
          (action: ReserveActions.ReserveAppointmentFail) => {
            this.toastService.errorToast(action.payload.error.msg);
          }
        )
      );
}
