import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { empty, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, mergeMap, catchError, tap, withLatestFrom, take } from 'rxjs/operators';
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
import { IBranch } from '../../models/IBranch';
import { IAppointmentState } from '../reducers/appointment.reducer';
import { ISystemInfoState } from '../reducers/system-info.reducer';
import { ISettingsAdminState } from '../reducers/settings-admin.reducer';

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
    .pipe(
      ofType(AppointmentActions.FETCH_APPOINTMENTS),
      switchMap((action: AppointmentActions.FetchAppointments) =>
        toAction(
          this.appointmentDataService.getAppointments(action.payload),
          AppointmentActions.FetchAppointmentsSuccess,
          AppointmentActions.FetchAppointmentsFail
        )
      )
    );

  @Effect()
  getAppointmentList$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.FETCH_APPOINTMENT_LIST),
      switchMap((action: AppointmentActions.FetchAppointmentList) =>
        toAction(
          this.appointmentDataService.getAppointmentList(action.payload.fromDate, action.payload.toDate, action.payload.branchId),
          AppointmentActions.FetchAppointmentListSuccess,
          AppointmentActions.FetchAppointmentListFail
        )
      )
    );

  @Effect({ dispatch: false })
  getAppointmentListFail$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.FETCH_APPOINTMENT_LIST_FAIL),
      tap((action: AppointmentActions.FetchAppointmentListFail) =>
        this.errorHandler.showError('label.list.fetch.fail', action.payload)
      ),
      switchMap((action: AppointmentActions.FetchAppointmentListFail) =>
        []
      )
    );

    @Effect({ dispatch: false })
    getAppointmentListSuccess$: Observable<Action> = this.actions$
      .pipe(
        ofType(AppointmentActions.FETCH_APPOINTMENT_LIST_SUCCESS),
        tap((action: AppointmentActions.FetchAppointmentListSuccess) => {
         if (action.payload.length === 0) {
          this.translateService.get('label.list.no.appointments').subscribe(
            (label: string) => {
              this.toastService.errorToast(label);
            }
          ).unsubscribe();
         }

         }
        )
      );
  @Effect()
  getActionAppointments$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.FETCH_ACTION_APPOINTMENTS),
      switchMap((action: AppointmentActions.FetchActionAppointments) =>
        toAction(
          this.appointmentDataService.getActionAppointments(action.payload),
          AppointmentActions.FetchActionAppointmentsSuccess,
          AppointmentActions.FetchActionAppointmentsFail
        )
      )
    );

  @Effect()
  getAppointmentQP$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.FETCH_APPOINTMENT_QP),
      switchMap((action: AppointmentActions.FetchAppointmentQP) =>
        toAction(
          this.appointmentDataService.fetchAppointmentQP(action.payload),
          AppointmentActions.FetchAppointmentQPSuccess,
          AppointmentActions.FetchAppointmentQPFail
        )
      )
    );

  @Effect()
  ResendAppointmentConfrimaton$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.RESEND_APPOINTMENT_COMFIRMATION),
      switchMap((action: AppointmentActions.ResendAppointmentConfrimaton) =>
        toAction(
          this.appointmentDataService.resendAppointmentConfirmation(action.payload),
          AppointmentActions.ResendAppointmentConfrimatonSuccess,
          AppointmentActions.ResendAppointmentConfrimatonFail
        )
      )
    );

  @Effect({ dispatch: false })
  ResendAppointmentConfrimatonFail$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.RESEND_APPOINTMENT_COMFIRMATION_FAIL),
      tap((action: AppointmentActions.ResendAppointmentConfrimatonFail) =>
        this.errorHandler.showError('message.notification.resend.fail', action.payload)
      ),
      switchMap((action: AppointmentActions.ResendAppointmentConfrimatonFail) =>
        []
      )
    );

  @Effect({ dispatch: false })
  ResendAppointmentConfrimatonSucces$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.RESEND_APPOINTMENT_COMFIRMATION_SUCCESS),
      tap((action: AppointmentActions.ResendAppointmentConfrimatonSuccess) => {
        this.translateService.get('message.notification.resend.success').subscribe(
          (label: string) => {
            this.toastService.successToast(label);
          }
        ).unsubscribe();
      }
      )
    );
  @Effect()
  FetchAppointmentEmailTemplete$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.FETCH_APPOINTMENT_EMAIL_TEMPLETE),
      switchMap((action: AppointmentActions.FetchAppointmentEmailTemplete) =>
        toAction(
          this.appointmentDataService.fetchAppointmentEmailTemplete(action.payload),
          AppointmentActions.FetchAppointmentEmailTempleteSuccess,
          AppointmentActions.FetchAppointmentEmailTempleteFail
        )
      )
    );

  @Effect({ dispatch: false })
  FetchAppointmentEmailTempleteFail$: Observable<Action> = this.actions$
    .pipe(
      ofType(CustomerActions.FETCH_APPOINTMENT_EMAIL_TEMPLETE_FAIL),
      tap((action: AppointmentActions.FetchAppointmentEmailTempleteFail) => {
        this.errorHandler
          .showError('messages.error.email.template', action.payload);
      }
      )
    );

  @Effect()
  setAppointmentStatEvent$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.SET_APPOINTMENT_STAT_EVENT),
      switchMap((action: AppointmentActions.SetAppointmentStatEvent) =>
        toAction(
          this.appointmentDataService.setAppointmentStatEvent(action.payload),
          AppointmentActions.SetAppointmentStatEventSuccess,
          AppointmentActions.SetAppointmentStatEventFail
        )
      )
    );

  @Effect()
  deleteAppointment$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.DELETE_APPOINTMENT),
      switchMap((action: AppointmentActions.DeleteAppointment) =>
        this.appointmentDataService.deleteAppointment(action.payload).pipe(
          mergeMap(() => [new AppointmentActions.DeleteAppointmentSuccess(action.payload)]),
          catchError((err: DataServiceError<any>) => of(new AppointmentActions.DeleteAppointmentFail(err))),
        )
      )
    );

  @Effect()
  deleteAppointmentSuccess$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.DELETE_APPOINTMENT_SUCCESS),
      withLatestFrom(this.store$.select((state: IAppState) => state.appointments),
       this.store$.select((state: IAppState) => state.systemInfo),
       this.store$.select((state: IAppState) => state.settings)),
      tap((data: any) => {
        const [action, apptState, sysInfoState, settingsState]: [AppointmentActions.DeleteAppointment,
           IAppointmentState, ISystemInfoState, ISettingsAdminState] = data;
        if (apptState.selectedAppointment === null) {
          const settingsMap = this.appUtils.getSettingsAsMap(settingsState.settings);
          const dateFormat = settingsMap.GetSystemParamsDateFormat.value ? sysInfoState.data.dateConvention : 'DD MMM YYYY';
          this.translateService.get('toast.cancel.booking.success',
            {
              name: action.payload.customers[0].name,
              date: moment(action.payload.start).format(dateFormat)
            }).subscribe(
              (label: string) => this.toastService.htmlSuccessToast(`<span dir="auto">${label}</span>`)
            ).unsubscribe();
        }
      }),
      switchMap((data: any) => {
        const [action, state]: [AppointmentActions.DeleteAppointment, IAppointmentState] = data;
        // If reschedule reset appointment
        const resetActions = state.selectedAppointment ? [new CustomerActions.ResetAppointment] : [];
        return [
          new CustomerActions.AddToBookingHistory({ appointment: action.payload, deleted: true }),
          new CustomerActions.ResetCurrentCustomer,
          ...resetActions
        ];
      })
    );

  @Effect({ dispatch: false })
  deleteAppointmentFailed$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.DELETE_APPOINTMENT_FAIL),
      tap((action: AppointmentActions.DeleteAppointmentFail) => {
        this.errorHandler
          .showError('toast.cancel.booking.error', action.payload);
      }));


  @Effect()
  selectAppointmentForEdit$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentActions.SELECT_APPOINTMENT),
      withLatestFrom(this.store$.select((state: IAppState) => state)),
      switchMap((data: any) => {
        const [action, state]: [AppointmentActions.SelectAppointment, IAppState] = data;
        const appointmentToLoad: IAppointment = action.payload;
        const settingsMap = this.appUtils.getSettingsAsMap(state.settings.settings);
        const selectAppointmentActions = this.getSelectAppointmentActions(state, settingsMap, appointmentToLoad);

        return [
          ...selectAppointmentActions
        ];
      })
    );

  getSelectAppointmentActions(
    state: IAppState,
    settingsMap: { [name: string]: Setting },
    appointment: IAppointment
  ) {
    const isValid = this.validateAppointment(state, settingsMap, appointment);

    if (isValid === true) {
      const appointmentMetaActions = this.getAppointmentMetaActions(appointment, settingsMap);
      const customerAction = state.customers.currentCustomer !== null
        ? [] : [new AppointmentActions.SelectCustomer(appointment.customers[0])];
      return [
        ...customerAction,
        new AppointmentActions.LoadSelectedServices(appointment.services),
        new AppointmentActions.LoadSelectedBranch(appointment.branch),
        ...appointmentMetaActions
      ];
    } else {
      this.translateService.get('label.select.appointment.error').pipe(take(1)).subscribe(
        (label) => {
          this.toastService.errorToast(label);
        }
      );

      return [
        new AppointmentActions.ResetAppointment
      ];
    }
  }

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
    if (settingsMap.OptionPreselect.value !== 'PreSelectNoOption'
      && settingsMap.OptionPreselect.value !== 'unavailable'
      && settingsMap.OptionPreselect.value !== 'NoOption') {
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

  validateAppointment(
    state: IAppState,
    settingsMap: { [name: string]: Setting },
    appointment: IAppointment
  ): boolean {
    const isValid = this.canLoadAppointment(state, settingsMap, appointment.services, appointment.branch);
    return isValid;
  }

  servicesAreAvailable(state: IAppState, servicesToCheck: IService[]): boolean {
    const serviceMap = state.services.services.reduce(
      (allServices: { [publicId: string]: IService }, service: IService) => {
        return {
          ...allServices,
          [service.publicId]: service
        };
      },
      {}
    );

    return servicesToCheck.reduce(
      (servicesArePresent: boolean, service: IService) => {
        return servicesArePresent ? (serviceMap[service.publicId] !== undefined ? true : false) : servicesArePresent;
      },
      true
    );
  }

  branchAreAvailable(state: IAppState, branchToCheck: IBranch): boolean {

    return state.branches.branches.reduce(
      (branchesArePresent: boolean, branch: IBranch) => {
        return !branchesArePresent ? (branch.publicId === branchToCheck.publicId ? true : false) : branchesArePresent;
      },
      false
    );
  }

  checkServices(state: IAppState, settingsMap: { [name: string]: Setting }, servicesToCheck: IService[]): boolean {
    const settingsAreValid = this.hasValidSettings(settingsMap, servicesToCheck);
    const servicesAvailable = this.servicesAreAvailable(state, servicesToCheck);
    return settingsAreValid && servicesAvailable;
  }

  hasValidSettings(settingsMap: { [name: string]: Setting }, servicesToCheck: IService[]): boolean {
    if (servicesToCheck.length > 1) {
      const multiServiceEnabled = settingsMap.AllowMultiService.value;
      if (multiServiceEnabled) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  canLoadAppointment(
    state: IAppState,
    settingsMap: { [name: string]: Setting },
    servicesToCheck: IService[],
    branchToCheck: IBranch
  ): boolean {
    const servicesAreValid = this.checkServices(state, settingsMap, servicesToCheck);
    if (servicesAreValid) {
      const branchAvailable = this.branchAreAvailable(state, branchToCheck);

      return branchAvailable ? true : false;
    } else {
      return false;
    }
  }
}
