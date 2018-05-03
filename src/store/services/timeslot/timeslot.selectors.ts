import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { ITimeslotState } from '../../reducers/timeslot.reducer';

// selectors
const getTimeslotState = createFeatureSelector<ITimeslotState>('timeslot');

const getTimeslots = createSelector(
  getTimeslotState,
  (state: ITimeslotState) => state.times
);

const getSelectedTimeslot = createSelector(
  getTimeslotState,
  (state: ITimeslotState) => state.selectedTime
);

const getTimeslotsLoading = createSelector(
  getTimeslotState,
  (state: ITimeslotState) => state.loading
);

const getTimeslotsLoaded = createSelector(
  getTimeslotState,
  (state: ITimeslotState) => state.loaded
);

const getTimeslotsError = createSelector(
  getTimeslotState,
  (state: ITimeslotState) => state.error
);


@Injectable()
export class TimeslotSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  times$ = this.store.select(getTimeslots);
  selectedTime$ = this.store.select(getSelectedTimeslot);
  timeslotsLoading$ = this.store.select(getTimeslotsLoading);
  timeslotsLoaded$ = this.store.select(getTimeslotsLoaded);
  timeslotsError$ = this.store.select(getTimeslotsError);
}
