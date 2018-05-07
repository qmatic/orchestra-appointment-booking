import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as BookingActions from './../actions';
import { BookingDataService } from '../services';
import { ToastService } from '../../services/util/toast.service';
import { IAppState } from '../reducers/index';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/empty';

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
          return toAction(
                    this.bookingDataService.bookAppointment(
                      action.payload.bookingInformation,
                      action.payload.appointment
                    ),
                    BookingActions.BookAppointmentSuccess,
                    BookingActions.BookAppointmentFail
                  );
        } else {
          return of(confirmAction);
        }
      })
    );

  @Effect({ dispatch: false })
  bookAppointmentFailed$: Observable<Action> = this.actions$
    .ofType(BookingActions.BOOK_APPOINTMENT_FAIL)
    .pipe(
      tap((action: BookingActions.BookAppointmentFail) => {
          this.translateService.get('label.create.appointment.fail').subscribe(
            (label: string) => this.toastService.errorToast(label)
          ).unsubscribe();
        }
      )
    );

  @Effect({ dispatch: false })
  bookAppointmentSuccess$: Observable<Action> = this.actions$
    .ofType(BookingActions.BOOK_APPOINTMENT_SUCCESS)
    .pipe(
      tap((action: BookingActions.BookAppointmentSuccess) => {
          this.translateService.get('label.create.appointment.success').subscribe(
            (label: string) => this.toastService.successToast(label)
          ).unsubscribe();
        }
      )
    );
}
