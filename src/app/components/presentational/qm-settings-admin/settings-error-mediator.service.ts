import { SettingsAdminDispatchers } from './../../../../store';
import { Router } from '@angular/router';
import { ISettingsUpdateRequest } from './../../../../models/ISettingsResponse';
import { CONFIG_NOT_FOUND } from './../../../util/orchestra-error-codes';
import { SettingsBuilder } from './../../../../models/SettingsBuilder';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsErrorMediator {

  constructor(private router: Router, private settingsAdminDispatchers: SettingsAdminDispatchers) { }

  mediate(errorPayLoad: any) {
    if (errorPayLoad) {
      if (errorPayLoad.errorCode === CONFIG_NOT_FOUND) {
        const sb = new SettingsBuilder();
        sb.buildDefaultSettings();
        const settingsUpdateRequest: ISettingsUpdateRequest = {
          settingsList: sb.toObject(),
          updateSilently: true
        };
        this.settingsAdminDispatchers.saveSettings(settingsUpdateRequest);
      }
    }
  }
}
