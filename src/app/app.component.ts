import { HttpClient } from '@angular/common/http';
import { CalendarSettingsDispatchers } from './../store/services/calendar-settings/calendar-settings.dispatcher';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastContainerDirective } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import * as moment from 'moment';
import * as locales from 'moment/min/locales';

import { IBranch } from './../models/IBranch';
import {
  UserSelectors,
  UserDispatchers,
  BranchDispatchers,
  UserRoleDispatchers,
  SystemInfoDispatchers,
  ServiceDispatchers,
  SettingsAdminDispatchers,
  AccountDispatchers
} from '../store';
import { ToastService } from '../services/util/toast.service';

@Component({
  selector: 'qm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userDirection$: Observable<string>;
  userLocale$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private branchDispatchers: BranchDispatchers,
    private userRoleDispatchers: UserRoleDispatchers,
    private systemInfoDispatchers: SystemInfoDispatchers,
    private serviceDispachers: ServiceDispatchers,
    private accountDispatchers: AccountDispatchers,
    private settingsAdminDispatchers: SettingsAdminDispatchers,
    private calendarSettingsDispatchers: CalendarSettingsDispatchers,
    private http: HttpClient
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.userLocale$ = this.userSelectors.userLocale$;
  }

  ngOnInit() {
    this.accountDispatchers.fetchAccountInfo();
    this.systemInfoDispatchers.fetchSystemInfo();
    this.settingsAdminDispatchers.fetchSettings();
    this.serviceDispachers.fetchServices();
    this.branchDispatchers.fetchBranches();
    this.calendarSettingsDispatchers.fetchCalendarSettingsInfo();

    // Set up locale of user
    this.userLocale$.subscribe(locale => {
      moment.locale(locale);
    });
  }
}
