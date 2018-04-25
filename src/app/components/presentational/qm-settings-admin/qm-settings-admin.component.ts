import { ISettingsUpdateRequest } from './../../../../models/ISettingsResponse';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  settings$: Observable<Setting[]>;
  settingsByCategory: SettingCategory[];
  settingsEditForm: FormGroup;

  constructor(private userSelectors: UserSelectors, private settingsAdminSelectors: SettingsAdminSelectors,
    private settingsAdminDispatchers: SettingsAdminDispatchers, private formBuilder: FormBuilder) {
      this.userDirection$ = this.userSelectors.userDirection$;
      this.settingsByCategory$ = this.settingsAdminSelectors.settingsByCategory$;
      this.settings$ = this.settingsAdminSelectors.settings$;
      this.setEditForm();
      this.settingsAdminDispatchers.fetchSettings();
   }


   setEditForm() {
    this.settings$.subscribe((settings) => {
      const ctrlConfig = {};
      if (settings && settings.length) {
        settings.forEach((set: Setting) => {
          ctrlConfig[set.name] = [set.value];
        });

        this.settingsEditForm = this.formBuilder.group(ctrlConfig);
      }
    });
   }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  toArray(map) {
    return Array.from(map.values());
  }

  saveSettings() {
    const settingsUpdateRequest: ISettingsUpdateRequest = {
      settingsList : this.settingsEditForm.value
    };
    this.settingsAdminDispatchers.updateSettings(settingsUpdateRequest);
  }
}
