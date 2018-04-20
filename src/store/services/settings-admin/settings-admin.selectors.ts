import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { ISettingsAdminState } from '../../reducers/settings-admin.reducer';

// selectors
const getSettingsAdminState = createFeatureSelector<ISettingsAdminState>('settings');

const getAllSettings = createSelector(
  getSettingsAdminState,
  (state: ISettingsAdminState) => state.settings
);



@Injectable()
export class SettingsAdminSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  settings$ = this.store.select(getAllSettings);
}
