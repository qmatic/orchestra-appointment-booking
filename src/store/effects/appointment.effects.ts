import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AppointmentActions from './../actions';
import * as CustomerActions from './../actions';
import { AppointmentDataService, DataServiceError } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';

const toAction = AppointmentActions.toAction();

@Injectable()
export class AppointmentEffects {
  constructor(
    private actions$: Actions,
    private appointmentDataService: AppointmentDataService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private router: Router,
    private errorHandler: GlobalErrorHandler
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

  @Effect()
  deleteAppointmentSuccess$: Observable<Action> = this.actions$
    .ofType(AppointmentActions.DELETE_APPOINTMENT_SUCCESS)
    .pipe(
    tap((action: AppointmentActions.DeleteAppointment) => {
      this.translateService.get('toast.cancel.booking.success', {date : moment(action.payload.start).format('DD MMM YYYY') }).subscribe(
        (label: string) => this.toastService.successToast(label)
      ).unsubscribe();

    }
    )).pipe(switchMap((action: AppointmentActions.DeleteAppointment) => {
      return [new CustomerActions.ResetCurrentCustomer()];
    }));

  @Effect({ dispatch: false })
  deleteAppointmentFailed$: Observable<Action> = this.actions$
    .ofType(AppointmentActions.DELETE_APPOINTMENT_FAIL)
    .pipe(
    tap((action: AppointmentActions.DeleteAppointmentFail) => {
      this.errorHandler
      .showError('toast.cancel.booking.error', action.payload);
    }));
}
