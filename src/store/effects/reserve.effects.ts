import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as ReserveActions from './../actions';
import { ReserveDataService } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { IAppState } from '../reducers/index';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/empty';
import { IAppointment } from '../../models/IAppointment';

const toAction = ReserveActions.toAction();

@Injectable()
export class ReserveEffects {
  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private reserveDataService: ReserveDataService,
    private toastService: ToastService,
  ) {}

  @Effect()
  reserveAppointment$: Observable<Action> = this.actions$
    .ofType(ReserveActions.RESERVE_APPOINTMENT)
    .pipe(
      withLatestFrom(this.store$.select((state: IAppState) => state.reserved.reservedAppointment)),
      switchMap((data: any) => {
        const [ action, reservedAppointment ]: [ReserveActions.ReserveAppointment, IAppointment] = data;
        if (reservedAppointment) {
          // Previously reserved appointment. Try to delete before continuing
          return Observable.forkJoin([
            of(action),
            toAction(
              this.reserveDataService.unreserveAppointment(reservedAppointment.publicId),
              ReserveActions.UnreserveAppointmentSuccess,
              ReserveActions.UnreserveAppointmentFail
            )
          ]);
        } else {
          // No previous reserved appointment. Continue to reserve.
          return of([action]);
        }
      }),
      switchMap((data: any) => {
        const [action, unreserveAppointmentAction]: [
                                                    ReserveActions.ReserveAppointment,
                                                    (ReserveActions.UnreserveAppointmentSuccess
                                                  | ReserveActions.UnreserveAppointmentSuccess)] = data;
        if (unreserveAppointmentAction) {
          const toReserveAction = ReserveActions.toActionSecondary(unreserveAppointmentAction);
          return toReserveAction(
            this.reserveDataService.reserveAppointment(
              action.payload.bookingInformation,
              action.payload.appointment
            ),
            ReserveActions.ReserveAppointmentSuccess,
            ReserveActions.ReserveAppointmentFail
          );
        } else {
          return toAction(
            this.reserveDataService.reserveAppointment(
              action.payload.bookingInformation,
              action.payload.appointment
            ),
            ReserveActions.ReserveAppointmentSuccess,
            ReserveActions.ReserveAppointmentFail
          );
        }
      })
    );

    @Effect()
    unreserveAppointment$: Observable<Action> = this.actions$
      .ofType(ReserveActions.DESELECT_TIMESLOT)
      .pipe(
        withLatestFrom(this.store$.select((state: IAppState) => state.reserved.reservedAppointment)),
        switchMap((data: any) => {
          const [ action, reservedAppointment ] = data;
          if (reservedAppointment) {
            return toAction(
              this.reserveDataService.unreserveAppointment(reservedAppointment.publicId),
              ReserveActions.UnreserveAppointmentSuccess,
              ReserveActions.UnreserveAppointmentFail
            );
          } else {
            return Observable.empty();
          }
        })
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
