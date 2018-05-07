import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IBookingState } from '../../reducers/booking.reducer';

// selectors
const getBookingState = createFeatureSelector<IBookingState>('booked');

const getBookedAppointment = createSelector(
  getBookingState,
  (state: IBookingState) => state.bookedAppointment
);

const getBookingHistory = createSelector(
  getBookingState,
  (state: IBookingState) => state.bookingHistory
);

const getBookingLoading = createSelector(
  getBookingState,
  (state: IBookingState) => state.loading
);

const getBookingLoaded = createSelector(
  getBookingState,
  (state: IBookingState) => state.loaded
);

const getBookingError = createSelector(
  getBookingState,
  (state: IBookingState) => state.error
);

@Injectable()
export class BookingSelectors {
  constructor(
    private store: Store<IAppState>,
  ) {}
  // selectors$
  bookedAppointment$ = this.store.select(getBookedAppointment);
  bookingHistory$ = this.store.select(getBookingHistory);
  bookingLoading$ = this.store.select(getBookingLoading);
  bookingLoaded$ = this.store.select(getBookingLoaded);
  bookingError$ = this.store.select(getBookingError);
}
