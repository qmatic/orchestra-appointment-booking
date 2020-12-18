import { SettingsBuilder } from './../../../models/SettingsBuilder';
import { ISettingsUpdateRequest } from './../../../models/ISettingsResponse';
import { IBranch } from './../../../models/IBranch';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as SettingsAdminActions from '../../actions';

@Injectable()
export class SettingsAdminDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchSettings() {
    this.store.dispatch(new SettingsAdminActions.FetchSettings);
  }

  saveSettings(updateRequest: ISettingsUpdateRequest) {
    this.store.dispatch(new SettingsAdminActions.SaveSettings(updateRequest));
  }

  updateSettingsStore(updateRequest: ISettingsUpdateRequest) {
    const settingsList = new SettingsBuilder()
    .buildDefaultSettings(updateRequest.currentSettingList)
    .mergeSettingsWithGet(updateRequest.settingsList)
    .toArray();
    console.log(settingsList)
    this.store.dispatch(new SettingsAdminActions.UpdateSettingsStore(settingsList));
  }
}
