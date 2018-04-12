import { ServiceDispatchers } from './../store/services/service.dispatchers';
import { UserRoleDispatchers } from './../store/services/user-role/user-role.dispatchers';
import { BranchDispatchers } from './../store/services/branch.dispatchers';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastContainerDirective } from 'ngx-toastr';

import { IBranch } from './../models/IBranch';
import { IAppState } from '../store/reducers';
import { UserSelectors, BranchSelectors, SystemInfoDispatchers } from '../store';
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
    private serviceDispachers: ServiceDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.branches$ = this.branchSelectors.filteredBranches$;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
    this.userRoleDispatchers.fetchUserRoleInfo();
    this.systemInfoDispatchers.fetchSystemInfo();
    this.serviceDispachers.fetchServices();
    this.branchDispatchers.fetchBranches();
  }

  branchSearch(searchText) {
    //this.branchDispatchers.filter(searchText);
  }

  serviceSearch(searchText) {
    // tslint:disable-next-line:no-trailing-whitespace
  }
}
