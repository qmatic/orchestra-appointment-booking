import { Setting, SettingCategory } from './../../../../models/Setting';
import { UserSelectors } from './../../../../store/services/user/user.selectors';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsAdminSelectors, SettingsAdminDispatchers } from '../../../../store/index';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'qm-settings-admin',
  templateUrl: './qm-settings-admin.component.html',
  styleUrls: ['./qm-settings-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class QmSettingsAdminComponent implements OnInit, AfterViewInit {
  userDirection$: Observable<string>;
  settingsByCategory$: Observable<SettingCategory[]>;
  settingsByCategory: SettingCategory[];
  settings$: Observable<Setting[]>;
  constructor(private userSelectors: UserSelectors, private settingsAdminSelectors: SettingsAdminSelectors,
    private settingsAdminDispatchers: SettingsAdminDispatchers) {
      this.settingsAdminDispatchers.fetchSettings();
      this.userDirection$ = this.userSelectors.userDirection$;
      this.settingsByCategory$ = this.settingsAdminSelectors.settingsByCategory$;
      this.settings$ = this.settingsAdminSelectors.settings$;
   }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  toArray(map) {
    return Array.from(map.values());
  }

  saveSettings() {
    console.log('settings update');
    this.settings$.subscribe((settings) => {
      this.settingsAdminDispatchers.updateSettings( {
        settingsList: settings
      });
    });

  }
}
