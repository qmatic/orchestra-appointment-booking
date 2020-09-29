import { PrintDispatchers } from './../services/print/print.dispatchers';
import { AppointmentMetaSelectors } from './../services/appointment-meta/appointment-meta.selectors';
import { NavigationService } from './../../app/util/navigation.service';
import { Injectable, Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { switchMap, tap, catchError, mergeMap, withLatestFrom, delay, timeout } from 'rxjs/operators';

import * as BookingActions from './../actions';
import { BookingDataService, DataServiceError } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { IAppState } from '../reducers/index';

import { IAppointment } from '../../models/IAppointment';
import { IBookingInformation } from '../../models/IBookingInformation';
import { IService } from '../../models/IService';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';
import { ERROR_CODE_TIMESLOT_TAKEN } from '../../app/shared/error-codes';
import { BookAppointmentSuccess } from '../index';
import {forkJoin} from 'rxjs';

const toAction = BookingActions.toAction();

@Injectable()
export class BookingEffects {
    constructor(
      private store$: Store<IAppState>,
      private actions$: Actions,
      private bookingDataService: BookingDataService,
      private toastService: ToastService,
      private translateService: TranslateService,
      private errorHandler: GlobalErrorHandler,
      private navigationService: NavigationService,
      private appointmentMetaSelectors: AppointmentMetaSelectors,
      private printDispatchers: PrintDispatchers
    ) {}

  @Effect()
  bookAppointment$: Observable<Action> = this.actions$
    .pipe(
      ofType(BookingActions.BOOK_APPOINTMENT),
      switchMap((action: BookingActions.BookAppointment) => {
        return forkJoin([
          of(action),
          toAction(
            this.bookingDataService.confirmAppointment(action.payload.appointment),
            BookingActions.BookAppointmentSuccess,
            BookingActions.BookAppointmentFail
          )
        ]);
      }),
      switchMap((data: any) => {
        const [action, confirmAction] = data;
        if (confirmAction.type === BookingActions.BOOK_APPOINTMENT_FAIL) {
          return this.bookingDataService.bookAppointment(
            action.payload.bookingInformation,
            action.payload.appointment
          ).pipe(
            mergeMap((appointmentData: IAppointment) => [
              new BookingActions.BookAppointmentSuccess(appointmentData)]
            ),
            catchError((err: DataServiceError<any>) =>
              of(new BookingActions.BookAppointmentFail(
                {
                  ...err,
                  appointment: action.payload.appointment,
                  bookingInformation: action.payload.bookingInformation
                }
              ))
            )
          );
        } else {
          return of(confirmAction);
        }
      })
    );

  @Effect()
  bookAppointmentFailed$: Observable<Action> = this.actions$
    .pipe(
      ofType(BookingActions.BOOK_APPOINTMENT_FAIL),
      tap((action: BookingActions.BookAppointmentFail) => {
        if (action.payload.errorCode === ERROR_CODE_TIMESLOT_TAKEN) {
          this.translateService.get('error.timeslot.taken').subscribe(
            (label: string) => {
              this.toastService.errorToast(label);
            }
          ).unsubscribe();
        } else {
          this.errorHandler.showError('label.create.appointment.fail', action.payload);
        }
      }),
      switchMap((action: BookingActions.BookAppointmentFail) => {
        const serviceQuery = action.payload.appointment.services.reduce((queryString, service: IService) => {
          return queryString + `;servicePublicId=${service.publicId}`;
        }, '');

        const bookingInformation: IBookingInformation = {
          ...action.payload.bookingInformation,
          serviceQuery
        };

        return [
          new BookingActions.ResetReservedAppointment,
          new BookingActions.DeselectTimeslot,
          new BookingActions.FetchTimeslots(bookingInformation)
        ];
      })
    );

  @Effect()
  bookAppointmentSuccess$: Observable<Action> = this.actions$
    .pipe(
      ofType(BookingActions.BOOK_APPOINTMENT_SUCCESS),
      withLatestFrom(this.store$.select((state: IAppState) => state.appointments.selectedAppointment)),
      tap((data: any) => {
        const [ action, selectedAppointment ]: [BookingActions.BookAppointmentSuccess, IAppointment] = data;
        // If not a reschedule
        if (selectedAppointment === null) {
          this.translateService.get('label.create.appointment.success').subscribe(
            (label: string) =>  {
              this.toastService.successToast(label);
                  this.appointmentMetaSelectors.printAppointmentOption$.subscribe(isPrint => {
                    if (isPrint) {
                      this.printDispatchers.setPrintedAppointment(action.payload);
                      setTimeout(() => {
                      this.navigationService.goToPrintConfirmPage();
                      }, 1000);
                    }
                  }).unsubscribe();
            }
          ).unsubscribe();
        } else {
          // If reschedule
          this.translateService.get('label.create.appointment.reschedule').subscribe(
            (label: string) =>  {
              this.toastService.successToast(label);
                  this.appointmentMetaSelectors.printAppointmentOption$.subscribe(isPrint => {
                    if (isPrint) {
                      this.printDispatchers.setPrintedAppointment(action.payload);
                      setTimeout(() => {
                      this.navigationService.goToPrintConfirmPage();
                      }, 1000);
                    }
                  }).unsubscribe();
            }
          ).unsubscribe();
        }
      }),
      switchMap((data: any) => {
        const [ action, selectedAppointment ]: [BookingActions.BookAppointmentSuccess, IAppointment] = data;
        const appointmentActions = this.getAppointmentActions(selectedAppointment);

        return [
          ...appointmentActions,
          new BookingActions.AddToBookingHistory({ appointment: action.payload, deleted: false }),
          new BookingActions.ResetCurrentCustomer,
          new BookingActions.ResetReservedAppointment,
          new BookingActions.DeselectServices,
          new BookingActions.ResetAppointmentNotificationType,
          new BookingActions.ResetAppointmentTitle,
          new BookingActions.ResetAppointmentNote,
          new BookingActions.PrintAppointmentOption(false)
        ];
      })
    );

  getAppointmentActions(appointment: IAppointment) {
    return appointment !== null
            ? [
                new BookingActions.DeleteAppointment(appointment),
                // new BookingActions.ResetAppointment
              ]
            : [];
  }
}
