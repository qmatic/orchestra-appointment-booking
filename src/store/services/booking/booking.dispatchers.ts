import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as BookingActions from '../../actions';
import { IBookingInformation } from '../../../models/IBookingInformation';
import { IAppointment } from '../../../models/IAppointment';

@Injectable()
export class BookingDispatchers {
  constructor(private store: Store<IAppState>) {}

  confirmAppointment(bookingInformation: IBookingInformation, appointment: IAppointment) {
    const payload = {
      bookingInformation,
      appointment
    };

    this.store.dispatch(new BookingActions.ConfirmAppointment(payload));
  }

  bookAppointment(bookingInformation: IBookingInformation, appointment: IAppointment) {
    const payload = {
      bookingInformation,
      appointment
    };

    this.store.dispatch(new BookingActions.BookAppointment(payload));
  }
}
