import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBranch } from '../../../../models/IBranch';
import {
  UserSelectors,
  BranchDispatchers,
  BranchSelectors
} from '../../../../store/index';

@Component({
  selector: 'qm-qm-app',
  templateUrl: './qm-app.component.html',
  styleUrls: ['./qm-app.component.scss']
})
export class QmAppComponent {

  userFullName$: Observable<string>;
  userDirection$: Observable<string>;
  branches$: Observable<IBranch[]>;

  constructor(
    private userSelectors: UserSelectors,
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers
  ) {
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.branches$ = this.branchSelectors.filteredBranches$;
  }

  branchSearch(searchText) {
    // this.branchDispatchers.filter(searchText);
  }

  serviceSearch(searchText) {
    // tslint:disable-next-line:no-trailing-whitespace

  }

}
