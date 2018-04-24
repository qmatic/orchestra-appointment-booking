import { Setting, SettingCategory } from './../../../models/Setting';
import { ISettingsAdminState } from './../../reducers/settings-admin.reducer';
import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';

// selectors
const getSettingsAdminState = createFeatureSelector<ISettingsAdminState>('settings');

const getAllSettings = createSelector(
  getSettingsAdminState,
  (state: ISettingsAdminState) => state.settings
);

const getSettingsByCategory = createSelector(getSettingsAdminState, (state: ISettingsAdminState) => {
  const settingsByCategory = new Map<string, SettingCategory>();

  state.settings.forEach((s: Setting) => {
    if (!settingsByCategory.has(s.category.name)) {
      settingsByCategory.set(s.category.name, s.category);
    }
    const foundCat = settingsByCategory.get(s.category.name);
    foundCat.settings.set(s.name, s);
    settingsByCategory.set(s.category.name, foundCat);
  });

  return Array.from(settingsByCategory.values());
});


@Injectable()
export class SettingsAdminSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  settings$ = this.store.select(getAllSettings);
  settingsByCategory$ = this.store.select(getSettingsByCategory);
}
