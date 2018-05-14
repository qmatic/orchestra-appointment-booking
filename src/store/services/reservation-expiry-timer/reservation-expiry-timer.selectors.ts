import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IReservationTimerState } from './../../reducers/reservation-expiry-timer.reducer';

// selectors
const getRervationTimerState = createFeatureSelector<IReservationTimerState>(
  'reservationExpiryTimer'
);

const getReservationTime = createSelector(
  getRervationTimerState,
  (state: IReservationTimerState) => state.onGoingTime
);

const showReservationExpiryTime = createSelector(
  getRervationTimerState,
  (state: IReservationTimerState) => state.showTimer
);

@Injectable()
export class ReservationExpiryTimerSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  reservationExpiryTime$ = this.store.select(getReservationTime);
  showReservationExpiryTime$ = this.store.select(showReservationExpiryTime);
}
