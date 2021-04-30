
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import * as AppointmentHistoryActions from '../actions';
import { AppointmentHistoryDataService, DataServiceError } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../index';
import { AppUtils } from '../../services/util/appUtils.service';

const toAction = AppointmentHistoryActions.toAction();

@Injectable()
export class AppointmentHistoryEffects {
  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private appointmentHistoryDataService: AppointmentHistoryDataService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private router: Router,
    private errorHandler: GlobalErrorHandler,
    private appUtils: AppUtils
  ) { }

  @Effect()
  getActionAppointments$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentHistoryActions.FETCH_ACTION_APPOINTMENTS),
      switchMap((action: AppointmentHistoryActions.FetchActionAppointments) =>
        toAction(
          this.appointmentHistoryDataService.getActionAppointments(action.payload),
          AppointmentHistoryActions.FetchActionAppointmentsSuccess,
          AppointmentHistoryActions.FetchActionAppointmentsFail
        )
      )
    );

  @Effect()
  getSelectedAppointment$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT),
      switchMap((action: AppointmentHistoryActions.FetchSelectedAppointment) =>
        toAction(
          this.appointmentHistoryDataService.getAppointmentById(action.payload),
          AppointmentHistoryActions.FetchSelectedAppointmentSuccess,
          AppointmentHistoryActions.FetchSelectedAppointmentFail
        )
      )
    );

  @Effect({ dispatch: false })
  getSelectedAppointmentFail$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT_FAIL),
      tap((action: AppointmentHistoryActions.FetchSelectedAppointmentFail) => {
        this.translateService.get('label.history.no.appointments').subscribe(
          (label: string) => {
            this.toastService.errorToast(label);
          }
        ).unsubscribe();
      }
      ),
      switchMap((action: AppointmentHistoryActions.FetchSelectedAppointmentFail) =>
        []
      )
    );

  @Effect({ dispatch: false })
  getSelectdAppointmentSuccess$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT_SUCCESS),
      tap((action: AppointmentHistoryActions.FetchSelectedAppointmentSuccess) => {
        if (!action.payload.appointment.qpId) {
        this.translateService.get('label.history.no.visits').subscribe(
          (label: string) => {
            this.toastService.errorToast(label);
          }
        ).unsubscribe();
        }
        }
      )
    );

@Effect()
getAppointmentVisit$: Observable<Action> = this.actions$
  .pipe(
    ofType(AppointmentHistoryActions.FETCH_VISIT_DATA),
    switchMap((action: AppointmentHistoryActions.FetchVisitData) =>
      toAction(
        this.appointmentHistoryDataService.getAppointmentVisit(action.payload),
        AppointmentHistoryActions.FetchVisitDataSuccess,
        AppointmentHistoryActions.FetchVisitDataFail
      )
    )
  );

@Effect({ dispatch: false })
getAppointmentVisitFail$: Observable<Action> = this.actions$
  .pipe(
    ofType(AppointmentHistoryActions.FETCH_VISIT_DATA_FAIL),
    tap((action: AppointmentHistoryActions.FetchVisitDataFail) => {
      this.translateService.get('label.history.no.visits').subscribe(
        (label: string) => {
          this.toastService.errorToast(label);
        }
      ).unsubscribe();
    }
    ),
    switchMap((action: AppointmentHistoryActions.FetchVisitDataFail) =>
      []
    )
  );

@Effect({ dispatch: false })
getAppointmentVisitSuccess$: Observable<Action> = this.actions$
  .pipe(
    ofType(AppointmentHistoryActions.FETCH_VISIT_DATA_SUCCESS),
    tap((action: AppointmentHistoryActions.FetchVisitDataSuccess) => {
      if (action.payload.length === 0) {
      this.translateService.get('label.history.no.visits').subscribe(
        (label: string) => {
          this.toastService.errorToast(label);
        }
      ).unsubscribe();
      }

      }
    )
  );

}