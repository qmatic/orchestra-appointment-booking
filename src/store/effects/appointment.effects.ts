import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { switchMap, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import * as AppointmentActions from './../actions';
import * as CustomerActions from './../actions';
import { AppointmentDataService, DataServiceError } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';
import { IAppointment } from '../../models/IAppointment';
import { IService } from '../../models/IService';
import { Store } from '@ngrx/store';
import { IAppState } from '../index';
import { Setting } from '../../models/Setting';
import { AppUtils } from '../../services/util/appUtils.service';

const toAction = AppointmentActions.toAction();

@Injectable()
export class AppointmentEffects {
  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private appointmentDataService: AppointmentDataService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private router: Router,
    private errorHandler: GlobalErrorHandler,
    private appUtils: AppUtils
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


  @Effect()
  selectAppointmentForEdit$: Observable<Action> = this.actions$
    .ofType(AppointmentActions.SELECT_APPOINTMENT)
    .pipe(
      withLatestFrom(this.store$.select((state: IAppState) => state.settings.settings)),
      switchMap((data: any) => {
        const [ action, settings ]: [AppointmentActions.SelectAppointment, Setting[]] = data;
        const appointmentToLoad: IAppointment = action.payload;
        const settingsMap = this.appUtils.getSettingsAsMap(settings);
        const appointmentMetaActions = this.getAppointmentMetaActions(appointmentToLoad, settingsMap);

        return [
          new AppointmentActions.LoadSelectedServices(appointmentToLoad.services),
          new AppointmentActions.LoadSelectedBranch(appointmentToLoad.branch),
          ...appointmentMetaActions
        ];
      })
    );

  getServicesQueryStringFromServices(services: IService[]): string {
    return services.reduce((queryString, service: IService) => {
      return queryString + `;servicePublicId=${service.publicId}`;
    }, '');
  }

  getAppointmentMetaActions(appointment: IAppointment, settingsMap: { [name: string]: Setting }) {
    const notifyAction = this.getNotifyAction(appointment, settingsMap);
    const titleAction = this.getTitleAction(appointment);
    const notesAction = this.getNotesAction(appointment);

    return [
      ...notifyAction,
      ...titleAction,
      ...notesAction
    ];
  }

  getNotifyAction(appointment: IAppointment, settingsMap: { [name: string]: Setting }) {

    if (appointment.custom && appointment.custom !== '') {
      const parsedCustom = JSON.parse(appointment.custom);
      if (parsedCustom && parsedCustom.notificationType) {
        if (this.notificationTypeIsValid(parsedCustom.notificationType, settingsMap)) {
          return [new AppointmentActions.SetAppointmentNotificationType(parsedCustom.notificationType)];
        } else {
          const notificationType = this.getNofificationTypeFromSettings(settingsMap);
          return [new AppointmentActions.SetAppointmentNotificationType(notificationType)];
        }

      }
    }
    return [];
  }

  getNofificationTypeFromSettings(settingsMap: { [name: string]: Setting }): string {
    if (settingsMap.OptionPreselect.value !== 'PreSelectNoOption') {
      return settingsMap.OptionPreselect.value;
    } else {
      return '';
    }
  }

  notificationTypeIsValid(notificationType: string, settingsMap: { [name: string]: Setting }): boolean {

    switch (notificationType) {
      case 'sms': {
        return settingsMap.IncludeSms.value === true;
      }
      case 'email': {
        return settingsMap.IncludeEmail.value === true;
      }
      case 'both': {
        return settingsMap.IncludeEmailAndSms.value === true;
      }
      case 'none': {
        return settingsMap.NoNotification.value === true;
      }
      default: {
        return false;
      }
    }
  }

  getTitleAction(appointment: IAppointment) {
    if (appointment.title && appointment.title !== '') {
      return [new AppointmentActions.SetAppointmentTitle(appointment.title)];
    } else {
      return [];
    }
  }

  getNotesAction(appointment: IAppointment) {
    if (appointment.notes && appointment.notes !== '') {
      return [new AppointmentActions.SetAppointmentNote(appointment.notes)];
    } else {
      return [];
    }
  }
}
