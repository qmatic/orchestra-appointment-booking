import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IDatesState } from '../../reducers/date.reducer';
import * as moment from 'moment';
import { ISettingsAdminState } from '../../reducers/settings-admin.reducer';
import { ISystemInfoState } from '../../reducers/system-info.reducer';
import { AppUtils } from '../../../services/util/appUtils.service';

// selectors
const getDatesState = createFeatureSelector<IDatesState>('dates');
const getSystemInfoState = createFeatureSelector<ISystemInfoState>('systemInfo');
const getSettingsState = createFeatureSelector<ISettingsAdminState>('settings');

const getDates = createSelector(
  getDatesState,
  (state: IDatesState) => state.dates
);

const getVisibleDates = createSelector(
  getDatesState,
  getSystemInfoState,
  getSettingsState,

  (
    dateState: IDatesState,
    systemInfoState: ISystemInfoState,
    settingsState: ISettingsAdminState
  ) => {
    return getFilteredDates(dateState, settingsState, systemInfoState.data.dateConvention);
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
  state: IDatesState,
  settings: ISettingsAdminState,
  dateFormat: string
): Array<string> {
  const settingsMap = new AppUtils().getSettingsAsMap(settings.settings);
  dateFormat = settingsMap.GetSystemParamsDateFormat.value ? dateFormat : 'dddd DD MMMM';
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
