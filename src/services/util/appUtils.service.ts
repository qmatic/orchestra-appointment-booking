import { Injectable } from '@angular/core';
import { Setting } from '../../models/Setting';

@Injectable()
export class AppUtils {
  constructor() {}

  getSettingsAsMap(settings: Setting[]): { [name: string]: Setting } {
    return settings.reduce(
      (allSettings: { [name: string]: Setting }, setting: Setting) => {
        const childSettings = {};

        if (setting.children && setting.children.size > 0) {
          setting.children.forEach((v, k) => {
            childSettings[k] = v;
          });
        }

        return {
          ...allSettings,
          [setting.name]: setting,
          ...childSettings
        };
      },
      {}
    );
  }
}
