import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastContainerDirective } from 'ngx-toastr';

import { IBranch } from './../models/IBranch';
import {
  UserSelectors,
  BranchSelectors,
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
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  userDirection$: Observable<string>;
  branches$: Observable<IBranch[]>;

  constructor(
    private userSelectors: UserSelectors,
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private toastService: ToastService,
    private userRoleDispatchers: UserRoleDispatchers,
    private systemInfoDispatchers: SystemInfoDispatchers,
    private serviceDispachers: ServiceDispatchers,
    private userDispatchers: UserDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.branches$ = this.branchSelectors.filteredBranches$;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
    this.userRoleDispatchers.fetchUserRoleInfo();
    this.userDispatchers.fetchUserInfo();
    this.systemInfoDispatchers.fetchSystemInfo();
    this.serviceDispachers.fetchServices();
    this.branchDispatchers.fetchBranches();
  }

  branchSearch(searchText) {
    // this.branchDispatchers.filter(searchText);
  }

  serviceSearch(searchText) {
    // tslint:disable-next-line:no-trailing-whitespace
  }
}
