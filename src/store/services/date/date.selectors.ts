import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IDatesState } from '../../reducers/date.reducer';
import { Setting } from '../../../models/Setting';
import { getSettingsAsMap } from '../settings-admin';
import { getUserLocale } from '../user';

// selectors
const getDatesState = createFeatureSelector<IDatesState>('dates');

const getDates = createSelector(
  getDatesState,
  (state: IDatesState) => state.dates
);

const getVisibleDates = createSelector(
  getDatesState,
  getUserLocale,
  getSettingsAsMap,
  (state: IDatesState, userLocale, settingsMap: { [name: string]: Setting }) => {
    return getFilteredDates(state, userLocale);
  }
);

const getSelectedDate = createSelector(
  getDatesState,
  (state: IDatesState) => state.selectedDate
);

const getDatesSearchText = createSelector(
  getDatesState,
  (state: IDatesState) => state.searchText
);

const getDatesLoading = createSelector(
  getDatesState,
  (state: IDatesState) => state.loading
);

const getDatesLoaded = createSelector(
  getDatesState,
  (state: IDatesState) => state.loaded
);

const getDatesError = createSelector(
  getDatesState,
  (state: IDatesState) => state.error
);

function getFilteredDates(state, userLocale, dateFormat = 'EEEE d MMMM'): Array<string> {
  const datePipe = new DatePipe('en');
  return state.searchText === ''
    ? state.dates
    : state.dates.filter(
        (date: string) => {
          return datePipe.transform(date, dateFormat, null, userLocale).toLowerCase().indexOf(state.searchText.toLowerCase()) !== -1;
        }
      );
}

@Injectable()
export class DateSelectors {
  constructor(
    private store: Store<IAppState>,
  ) {}
  // selectors$
  dates$ = this.store.select(getDates);
  visibleDates$ = this.store.select(getVisibleDates);
  selectedDate$ = this.store.select(getSelectedDate);
  searchText$ = this.store.select(getDatesSearchText);
  datesLoading$ = this.store.select(getDatesLoading);
  datesLoaded$ = this.store.select(getDatesLoaded);
  datesError$ = this.store.select(getDatesError);
}
