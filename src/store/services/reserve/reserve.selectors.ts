import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IReserveState } from '../../reducers/reserve.reducer';

// selectors
const getReserveState = createFeatureSelector<IReserveState>('reserved');

const getReservedAppointment = createSelector(
  getReserveState,
  (state: IReserveState) => state.reservedAppointment
);

const getReserveLoading = createSelector(
  getReserveState,
  (state: IReserveState) => state.loading
);

const getReserveLoaded = createSelector(
  getReserveState,
  (state: IReserveState) => state.loaded
);

const getReserveError = createSelector(
  getReserveState,
  (state: IReserveState) => state.error
);

@Injectable()
export class ReserveSelectors {
  constructor(
    private store: Store<IAppState>,
  ) {}
  // selectors$
  reservedAppointment$ = this.store.select(getReservedAppointment);
  reserveLoading$ = this.store.select(getReserveLoading);
  reserveLoaded$ = this.store.select(getReserveLoaded);
  reserveError$ = this.store.select(getReserveError);
}
