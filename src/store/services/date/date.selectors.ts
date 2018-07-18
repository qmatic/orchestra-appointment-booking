import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IDatesState } from '../../reducers/date.reducer';
import { Setting } from '../../../models/Setting';
import { getSettingsAsMap } from '../settings-admin';
import { getUserLocale } from '../user';
import * as moment from 'moment';

// selectors
const getDatesState = createFeatureSelector<IDatesState>('dates');

const getDates = createSelector(
  getDatesState,
  (state: IDatesState) => state.dates
);

const getVisibleDates = createSelector(
  getDatesState,
  getUserLocale,
  (
    state: IDatesState,
    userLocale
  ) => {
    return getFilteredDates(state);
  }
);

export const getSelectedDate = createSelector(
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

function getFilteredDates(
  state,
  dateFormat = 'dddd DD MMMM'
): Array<string> {
  return state.searchText === ''
    ? state.dates
    : state.dates.filter((date: string) => {
        return (
          moment(date)
            .format(dateFormat)
            .toLowerCase()
            .indexOf(state.searchText.toLowerCase()) !== -1
        );
      });
}

@Injectable()
export class DateSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  dates$ = this.store.select(getDates);
  visibleDates$ = this.store.select(getVisibleDates);
  selectedDate$ = this.store.select(getSelectedDate);
  searchText$ = this.store.select(getDatesSearchText);
  datesLoading$ = this.store.select(getDatesLoading);
  datesLoaded$ = this.store.select(getDatesLoaded);
  datesError$ = this.store.select(getDatesError);
}
