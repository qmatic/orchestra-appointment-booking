import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap, withLatestFrom, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as BookingActions from './../actions';
import { BookingDataService, DataServiceError } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { IAppState } from '../reducers/index';

import 'rxjs/add/observable/empty';
import { IAppointment } from '../../models/IAppointment';
import { IBookingInformation } from '../../models/IBookingInformation';
import { IService } from '../../models/IService';

const toAction = BookingActions.toAction();

@Injectable()
export class BookingEffects {
    constructor(
      private store$: Store<IAppState>,
      private actions$: Actions,
      private bookingDataService: BookingDataService,
      private toastService: ToastService,
      private translateService: TranslateService
    ) {}

  @Effect()
  bookAppointment$: Observable<Action> = this.actions$
    .ofType(BookingActions.BOOK_APPOINTMENT)
    .pipe(
      switchMap((action: BookingActions.BookAppointment) => {
        return Observable.forkJoin([
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
    .ofType(BookingActions.BOOK_APPOINTMENT_FAIL)
    .pipe(
      tap((action: BookingActions.BookAppointmentFail) => {
          this.translateService.get('label.create.appointment.fail').subscribe(
            (label: string) => this.toastService.errorToast(label)
          ).unsubscribe();
        }
      ),
      switchMap((action: BookingActions.BookAppointmentFail) => {
        const serviceQuery = action.payload.appointment.services.reduce((queryString, service: IService) => {
          return queryString + `;servicePublicId=${service.publicId}`;
        }, '');

        const bookingInformation: IBookingInformation = {
          ...action.payload.bookingInformation,
          serviceQuery
        };

        return [new BookingActions.DeselectTimeslot, new BookingActions.FetchTimeslots(bookingInformation)];
      })
    );

  @Effect()
  bookAppointmentSuccess$: Observable<Action> = this.actions$
    .ofType(BookingActions.BOOK_APPOINTMENT_SUCCESS)
    .pipe(
      tap((action: BookingActions.BookAppointmentSuccess) => {
          this.translateService.get('label.create.appointment.success').subscribe(
            (label: string) => this.toastService.successToast(label)
          ).unsubscribe();
        }
      ),
      // withLatestFrom(this.store$.select((state: IAppState) => state.appointments.appointments)),
      switchMap((data: any) => {
        // const [ action, appointments ]: [ BookingActions.BookAppointmentSuccess, IAppointment[] ] = data;
        // if (appointments.length > 0) {
        //   return [
        //     new BookingActions.FetchAppointments(action.payload.customers[0].publicId),
        //     new BookingActions.ResetReservedAppointment,
        //     new BookingActions.DeselectServices,
        //     new BookingActions.ResetAppointmentNotificationType,
        //     new BookingActions.ResetAppointmentTitle,
        //     new BookingActions.ResetAppointmentNote
        //   ];
        // }
        return [
          new BookingActions.ResetCurrentCustomer,
          new BookingActions.ResetAppointments,
          new BookingActions.ResetReservedAppointment,
          new BookingActions.DeselectServices,
          new BookingActions.ResetAppointmentNotificationType,
          new BookingActions.ResetAppointmentTitle,
          new BookingActions.ResetAppointmentNote
        ];
      })
    );
}
