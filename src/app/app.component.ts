import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastContainerDirective } from 'ngx-toastr';

import { IBranch } from './../models/IBranch';
import {
  UserSelectors,
  UserDispatchers,
  BranchDispatchers,
  UserRoleDispatchers,
  SystemInfoDispatchers,
  ServiceDispatchers
} from '../store';
import { ToastService } from '../services/util/toast.service';

@Component({
  selector: 'qm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userDirection$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private branchDispatchers: BranchDispatchers,
    private userRoleDispatchers: UserRoleDispatchers,
    private systemInfoDispatchers: SystemInfoDispatchers,
    private serviceDispachers: ServiceDispatchers,
    private userDispatchers: UserDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
    this.userRoleDispatchers.fetchUserRoleInfo();
    this.userDispatchers.fetchUserInfo();
    this.systemInfoDispatchers.fetchSystemInfo();
    this.serviceDispachers.fetchServices();
    this.branchDispatchers.fetchBranches();
  }
}
