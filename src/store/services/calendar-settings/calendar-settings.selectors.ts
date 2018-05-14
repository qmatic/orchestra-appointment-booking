import { ICalendarSetting } from './../../../models/ICalendarSetting';
import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { ICalendarSettingsState } from './../../reducers/calendar-settings.reducer';

// selectors
const getCalendarSettingsState = createFeatureSelector<ICalendarSettingsState>(
  'calendarSettings'
);

const getCalendarSetting = createSelector(
  getCalendarSettingsState,
  (state: ICalendarSettingsState) => state.data
);

const getReservationExpiryTime = createSelector(
  getCalendarSetting,
  (state: ICalendarSetting) => state.reservationExpiryTimeSeconds
);

@Injectable()
export class CalendarSettingsSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  getReservationExpiryTime$ = this.store.select(getReservationExpiryTime);
}
