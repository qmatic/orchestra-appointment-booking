import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IBookingState } from '../../reducers/booking.reducer';

// selectors
const getBookingState = createFeatureSelector<IBookingState>('booking');

const getBookingAppointment = createSelector(
  getBookingState,
  (state: IBookingState) => state.appointment
);

const getNotes = createSelector(
  getBookingState,
  (state: IBookingState) => state.appointment.notes
);

const getNotesLength = createSelector(
  getBookingState,
  (state: IBookingState) => state.appointment.notes.length
);

const getBookingLoading = createSelector(
  getBookingState,
  (state: IBookingState) => state.loading
);

const getBookingError = createSelector(
  getBookingState,
  (state: IBookingState) => state.error
);

@Injectable()
export class BookingSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  bookingAppointment$ = this.store.select(getBookingAppointment);
  bookingNotes$ = this.store.select(getNotes);
  bookingNotesLength$ = this.store.select(getNotesLength);
  bookingLoading$ = this.store.select(getBookingLoading);
  bookingError$ = this.store.select(getBookingError);
}
