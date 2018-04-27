import { ToastContainerDirective } from 'ngx-toastr';
import { ToastService } from './../../../../services/util/toast.service';
import { ISettingsUpdateRequest } from './../../../../models/ISettingsResponse';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Setting, SettingCategory } from './../../../../models/Setting';
import { UserSelectors } from './../../../../store/services/user/user.selectors';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SettingsAdminSelectors, SettingsAdminDispatchers } from '../../../../store/index';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'qm-settings-admin',
  templateUrl: './qm-settings-admin.component.html',
  styleUrls: ['./qm-settings-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class QmSettingsAdminComponent implements OnInit {
  userDirection$: Observable<string>;
  settingsByCategory$: Observable<SettingCategory[]>;
  settings$: Observable<Setting[]>;
  settingsByCategory: SettingCategory[];
  settingsEditForm: FormGroup;
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  constructor(private userSelectors: UserSelectors, private settingsAdminSelectors: SettingsAdminSelectors,
    private settingsAdminDispatchers: SettingsAdminDispatchers, private formBuilder: FormBuilder, private toastService: ToastService) {
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
          ctrlConfig[set.name] = [set.value, this.getValidators(set.validators)];

          if (set.children) {
            set.children.forEach((child: Setting) => {
              ctrlConfig[child.name] = [child.value];
            });
          }
        });

        this.settingsEditForm = this.formBuilder.group(ctrlConfig);

        settings.forEach((set) => {
          this.handleSettingSelect(set);
        });
      }
    });
  }

  getValidators(validators) {
    const validationArray = [];

    for (const key in validators) {
      if (validators.hasOwnProperty(key)) {
        if ( key === 'required' && validators[key]) {
          validationArray.push(Validators.required);
        } else if (key === 'pattern') {
          validationArray.push(Validators.pattern(validators[key]));
        }
      }
    }

    return validationArray;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
  }

  toArray(map) {
    if (!map) {
      return [];
    }
    return Array.from(map.values());
  }

  handleSettingSelect(settingObj: Setting) {
    const control: AbstractControl = this.settingsEditForm.get(settingObj.name);

        this.settings$.subscribe((settings) => {
          const foundSetting = settings.find((x) => x.name === settingObj.name);
          if (foundSetting.children && foundSetting.children.size > 0) {
            foundSetting.children.forEach((childSetting) => {
              const childControl = this.settingsEditForm.get(childSetting.name);
              if (control.value === false) {
                childControl.disable();
                childControl.setValue(null);
              } else {
                childControl.enable();
              }

            });
          }
        }
      ).unsubscribe();
  }

  saveSettings() {
    const settingsUpdateRequest: ISettingsUpdateRequest = {
      settingsList: this.settingsEditForm.value
    };
    this.settingsAdminDispatchers.saveSettings(settingsUpdateRequest);
  }

  toHTML(input): any {
    return new DOMParser().parseFromString(input, 'text/html').documentElement.textContent;
  }

  cancelEdit() {
    this.setEditForm();
  }
}
