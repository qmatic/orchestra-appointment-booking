import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AppointmentActions from './../actions';
import { AppointmentDataService, DataServiceError } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';

const toAction = AppointmentActions.toAction();

@Injectable()
export class AppointmentEffects {
  constructor(
    private actions$: Actions,
    private appointmentDataService: AppointmentDataService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

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


  @Effect({ dispatch: false })
  deleteAppointmentSuccess$: Observable<Action> = this.actions$
    .ofType(AppointmentActions.DELETE_APPOINTMENT_SUCCESS)
    .pipe(
    tap(() => {
      this.translateService.get('toast.cancel.booking.success').subscribe(
        (label: string) => this.toastService.successToast(label)
      ).unsubscribe();

    })
    );

  @Effect({ dispatch: false })
  deleteAppointmentFailed$: Observable<Action> = this.actions$
    .ofType(AppointmentActions.DELETE_APPOINTMENT_FAIL)
    .pipe(
    tap(() => {
      this.translateService.get('toast.cancel.booking.error').subscribe(
        (label: string) => this.toastService.errorToast(label)
      ).unsubscribe();
    }));
}
