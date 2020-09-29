
import {empty as observableEmpty, forkJoin as observableForkJoin,  Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { TranslateService } from '@ngx-translate/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, tap, map, withLatestFrom, mergeMap, catchError } from 'rxjs/operators';
import * as ReserveActions from './../actions';
import { ReserveDataService, DataServiceError } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { IAppState } from '../reducers/index';



import { IAppointment } from '../../models/IAppointment';
import { IService } from '../../models/IService';
import { IBookingInformation } from '../../models/IBookingInformation';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';
import { ERROR_CODE_TIMESLOT_TAKEN } from '../../app/shared/error-codes';

const toAction = ReserveActions.toAction();

@Injectable()
export class ReserveEffects {
  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private reserveDataService: ReserveDataService,
    private toastService: ToastService,
    private errorHandler: GlobalErrorHandler,
    private translateService: TranslateService
  ) {}

  @Effect()
  reserveAppointment$: Observable<Action> = this.actions$
    .pipe(
      ofType(ReserveActions.RESERVE_APPOINTMENT),
      withLatestFrom(this.store$.select((state: IAppState) => state.reserved.reservedAppointment)),
      switchMap((data: any) => {
        const [ action, reservedAppointment ]: [ReserveActions.ReserveAppointment, IAppointment] = data;
        if (reservedAppointment) {
          // Previously reserved appointment. Try to delete before continuing
          return observableForkJoin([
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
                                                  | ReserveActions.UnreserveAppointmentFail)] = data;
        if (unreserveAppointmentAction && unreserveAppointmentAction.type === ReserveActions.UNRESERVE_APPOINTMENT_SUCCESS) {
          return this.reserveDataService.reserveAppointment(
                action.payload.bookingInformation,
                action.payload.appointment
              ).pipe(
                mergeMap((appointmentData: IAppointment) => [
                  new ReserveActions.ResetReservedAppointment,
                  new ReserveActions.ReserveAppointmentSuccess(appointmentData)]
                ),
                catchError((err: DataServiceError<any>) => {

                  return [
                    new ReserveActions.ResetReservedAppointment,
                    new ReserveActions.ReserveAppointmentFail(
                    {
                      ...err,
                      appointment: action.payload.appointment,
                      bookingInformation: action.payload.bookingInformation
                    }
                  )];
                }
              )
          );
        } else {
          return this.reserveDataService.reserveAppointment(
            action.payload.bookingInformation,
            action.payload.appointment
          ).pipe(
            mergeMap((appointmentData: IAppointment) => [
              new ReserveActions.ReserveAppointmentSuccess(appointmentData)]
            ),
            catchError((err: DataServiceError<any>) =>
              of(new ReserveActions.ReserveAppointmentFail(
                {
                  ...err,
                  appointment: action.payload.appointment,
                  bookingInformation: action.payload.bookingInformation
                }
              ))
            )
          );
        }
      })
    );

    @Effect()
    unreserveAppointment$: Observable<Action> = this.actions$
      .pipe(
        ofType(ReserveActions.DESELECT_TIMESLOT),
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
            return observableEmpty();
          }
        })
      );

    @Effect()
    reserveAppointmentFailed$: Observable<Action> = this.actions$
      .pipe(
        ofType(ReserveActions.RESERVE_APPOINTMENT_FAIL),
        tap(
          (action: ReserveActions.ReserveAppointmentFail) => {
            if (action.payload.errorCode === ERROR_CODE_TIMESLOT_TAKEN) {
              this.translateService.get('error.timeslot.taken').subscribe(
                (label: string) => {
                  this.toastService.errorToast(label);
                }
              ).unsubscribe();
            } else {
              this.errorHandler.showError('error.reserve.appointment.failed', action.payload);
            }
          }
        ),
        switchMap((action: ReserveActions.ReserveAppointmentFail) => {
          const serviceQuery = action.payload.appointment.services.reduce((queryString, service: IService) => {
            return queryString + `;servicePublicId=${service.publicId}`;
          }, '');

          const bookingInformation: IBookingInformation = {
            ...action.payload.bookingInformation,
            serviceQuery
          };

          return [new ReserveActions.DeselectTimeslot, new ReserveActions.FetchTimeslots(bookingInformation)];
        })
      );
}
