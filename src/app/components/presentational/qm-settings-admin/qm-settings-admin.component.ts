import { SettingsListboxComponent } from './settings-listbox/settings-listbox.component';
import { APP_URL, BOOKING_HOME_URL } from './../../containers/qm-page-header/header-navigation';
import { SPService } from './../../../../services/rest/sp.service';
import { CanComponentDeactivate } from './../../../../routes/can-deactivatet';
import { Subscription ,  Observable ,  Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { ToastContainerDirective } from 'ngx-toastr';
import { ToastService } from './../../../../services/util/toast.service';
import { ISettingsUpdateRequest } from './../../../../models/ISettingsResponse';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Setting, SettingCategory } from './../../../../models/Setting';
import { UserSelectors } from './../../../../store/services/user/user.selectors';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewEncapsulation, OnDestroy,
  QueryList, AfterViewInit} from '@angular/core';
import { SettingsAdminSelectors, SettingsAdminDispatchers } from '../../../../store/index';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../../../services/util/modal.service';
import { RouterEvent } from '@angular/router';
import { LOGOUT, HOME } from '../../containers/qm-page-header/header-navigation';
import { Logout } from '../../../../services/util/logout.service';
// import { forEach } from '@angular/router';

@Component({
  selector: 'qm-settings-admin',
  templateUrl: './qm-settings-admin.component.html',
  styleUrls: ['./qm-settings-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class QmSettingsAdminComponent implements OnInit, OnDestroy, CanComponentDeactivate, AfterViewInit {

  userDirection$: Observable<string>;
  settingsByCategory$: Observable<SettingCategory[]>;
  settings$: Observable<Setting[]>;
  settingsByCategory: SettingCategory[];
  settingsEditForm: FormGroup;
  @ViewChild(ToastContainerDirective, {static: false}) toastContainer: ToastContainerDirective;
  @ViewChild(SettingsListboxComponent,  {static: false}) preselectList: SettingsListboxComponent;
  subscriptions: Subscription = new Subscription();
  isHeaderNavigationClicked: Boolean = false;
  isUserOptedBrowserNavigation: Boolean = false;
  onSaveClick: Boolean = false;
  readonly unavalableSettingKey = 'unavailable';
  preselectValueCollection: Array<any> = [{ key: this.unavalableSettingKey, name: this.unavalableSettingKey, isVisible: false },
    { key: 'PreSelectNoOption', name: 'PreSelectNoOption' },
    {key: 'sms', name: 'IncludeSms'}, {key: 'email', name: 'IncludeEmail'}, {key: 'both', name: 'IncludeEmailAndSms'},
    {key: 'none', name: 'NoNotification'}];

  preselectBoundCollection: Array<any> = [];

  private readonly APP_URL: string = '/app';
  private readonly NULL: string = '-1';
  private settings: SettingCategory[]

  constructor(private userSelectors: UserSelectors, private settingsAdminSelectors: SettingsAdminSelectors,
    private settingsAdminDispatchers: SettingsAdminDispatchers, private formBuilder: FormBuilder, private toastService: ToastService,
    private translateService: TranslateService, private modalService: ModalService,
    private spService: SPService,
    private router: Router,
    private logoutService: Logout
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsByCategory$ = this.settingsAdminSelectors.settingsByCategory$;
    this.settings$ = this.settingsAdminSelectors.settings$;
  }

  private preselectOptionKeys: string[] = [
    'label.settings.preselect.nooption',
    'label.settings.preselect.sms',
    'label.settings.preselect.email',
    'label.settings.preselect.emailandsms',
    'label.settings.preselect.nonotification'
  ];

  preselectOptions: string[] = [];

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
    const translateSubscription = this.translateService.get(this.preselectOptionKeys).subscribe(
      (preselectOptions: string[]) => {
       this.preselectOptions = preselectOptions;
      }
    );
    this.setEditForm();

    const settingsByCategorySubscription = this.settingsByCategory$.subscribe((settings) => {
      this.settings = settings;
     });
     this.subscriptions.add(settingsByCategorySubscription)
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onRouteChange(event: RouterEvent) {
    /*if (event instanceof NavigationStart) {
      if (this.settingsEditForm.dirty) {
        this.clickBackToAppointmentsPage(event);
        return;
      }
    }
    */
  }

  setEditForm() {
    this.settings$.subscribe((settings) => {
      const ctrlConfig = {};
      if (settings && settings.length) {
        settings.forEach((set: Setting) => {
          ctrlConfig[set.name] = [set.value, this.getValidators(set.validators)];

          if (set.children) {
            set.children.forEach((child: Setting) => {
              ctrlConfig[child.name] = [child.value, this.getValidators(child.validators)];
            });
          }
        });

        this.settingsEditForm = this.formBuilder.group(ctrlConfig);
        settings.forEach((set) => {
          this.handleSettingSelect(set, true);
        });
      }
    });
  }

  getValidators(validators) {
    const validationArray = [];

    for (const key in validators) {
      if (validators.hasOwnProperty(key)) {
        if (key === 'required' && validators[key]) {
          validationArray.push(Validators.required);
        } else if (key === 'pattern') {
          validationArray.push(Validators.pattern(validators[key]));
        }
      }
    }

    return validationArray;
  }

  clickBackToAppointmentsPage($event) {
    this.isHeaderNavigationClicked = true;
    this.retainUserIfUnsavedChanges();
  }

  retainUserIfUnsavedChanges() {
    if (this.settingsEditForm.dirty) {
      const modal = this.modalService.openNavigateBackConfirmModal();
      modal.result.then((result) => {
        if (result === 'OK') {
          this.router.navigateByUrl(this.APP_URL);
        }
      });
    }  else {
      this.router.navigateByUrl(this.APP_URL);
    }
  }

  toArray(map) {
    if (!map) {
      return [];
    }
    return Array.from(map.values());
  }

  handleSettingSelect(settingObj: Setting, onFormLoad = false) {
    const control: AbstractControl = this.settingsEditForm.get(settingObj.name);
    if (settingObj.category.name === 'Notification') {
      const preselectControl: AbstractControl = this.settingsEditForm.get('OptionPreselect');
      if (control.value === false) {

        const foundPreselectObj = this.preselectValueCollection.find(x => x.name === settingObj.name);
        if ( foundPreselectObj && (preselectControl.value ===  foundPreselectObj.key)) {
          preselectControl.setValue(this.preselectValueCollection[1].key);
        }
      }
      const foundOption = this.preselectValueCollection[this.preselectValueCollection.findIndex((s => s.name === settingObj.name))];
        if (foundOption) {
          foundOption.isVisible = control.value;
        }

      if (this.preselectValueCollection.filter(s => s.key !== 'PreSelectNoOption' && s.key !== this.unavalableSettingKey
        && s.isVisible !== false).length < 1) {
        this.preselectValueCollection[0].isVisible = true;
        this.preselectValueCollection[1].isVisible = false;
        preselectControl.setValue(this.preselectValueCollection[0].key);
        preselectControl.markAsDirty();
      } else if (preselectControl.value === this.unavalableSettingKey) {
        this.preselectValueCollection[0].isVisible = false;
        this.preselectValueCollection[1].isVisible = true;
        preselectControl.setValue(this.preselectValueCollection[1].key);
      }
      this.preselectBoundCollection = this.preselectValueCollection.filter(s => s.isVisible !== false);
      
    }

    this.settings$.subscribe((settings) => {
      const foundSetting = settings.find((x) => x.name === settingObj.name);
      if (foundSetting.children && foundSetting.children.size > 0) {
        foundSetting.children.forEach((childSetting) => {
          const childControl = this.settingsEditForm.get(childSetting.name);
          if (control.value === false) {
            childControl.setValue(null); // orchestra does not accept null
            childControl.disable();
            if (!onFormLoad) {
              childControl.markAsDirty();
            } else {
              childControl.markAsPristine();
            }
          } else {
            childControl.enable();
          }
        });
      }
    }
    ).unsubscribe();
  }

  saveSettings() {
    /*const changedSettingsList = {};

    Object.keys(this.settingsEditForm.controls).forEach(key => {
      const formCtrl = this.settingsEditForm.get(key);
      if (formCtrl.dirty) {
        changedSettingsList[key] = formCtrl.value;
      }
    });*/

    const changedSettingsList = Object.keys(this.settingsEditForm.controls)
      .reduce((obj, key) => {
        const formCtrl = this.settingsEditForm.get(key);
        if (formCtrl.dirty) {
          obj[key] = formCtrl.value === null ? this.NULL : formCtrl.value;
        }
        return obj;
    }, {});

    const settingsUpdateRequest : ISettingsUpdateRequest = {
      settingsList: changedSettingsList,
      updateSilently: false,
      currentSettingList: this.settings
    };

    this.settingsAdminDispatchers.saveSettings(settingsUpdateRequest);
    this.onSaveClick = true;
  }

  canDeactivate (): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.isHeaderNavigationClicked && !this.isUserOptedBrowserNavigation && !this.onSaveClick) {
      if (this.settingsEditForm.dirty) {
        const modal = this.modalService.openNavigateBackConfirmModal();
        modal.result.then((result: string) => {
          if (result === 'OK') {
            this.router.navigateByUrl(BOOKING_HOME_URL);
            this.isUserOptedBrowserNavigation = true;
          }
        });
        return false;
      }  else {
        return true;
      }
    } else {
      return true;
    }
  }

  toHTML(input): any {
    return new DOMParser().parseFromString(input, 'text/html').documentElement.textContent;
  }

  cancelEdit() {
    this.setEditForm();
    this.router.navigateByUrl(this.APP_URL);
  }

  handleHeaderNavigations(navigationType) {
    this.isHeaderNavigationClicked = true;
    if (this.settingsEditForm.dirty) {
      const modal = this.modalService.openNavigateBackConfirmModal();
      modal.result.then((result) => {
        if (result === 'OK') {
          this.navigateToLink(navigationType);
        }
      });
    } else {
      this.navigateToLink(navigationType);
    }
  }

  navigateToLink(navigationType) {
    if (navigationType === LOGOUT) {
      this.logoutService.logout();
    } else if (navigationType === HOME) {
      window.location.href = '/';
    }
  }
}
