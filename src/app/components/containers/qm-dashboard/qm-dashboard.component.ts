import { IBranch } from './../../../../models/IBranch';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBranch } from '../../../../models/IBranch';
import { BranchSelectors, BranchDispatchers } from '../../../../store';

@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss']
})
export class QmDashboardComponent implements OnInit {
  branches$: Observable<IBranch[]>;
  constructor(
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers
  ) {
    this.branches$ = this.branchSelectors.filteredBranches$;
  }

  ngOnInit() {
  }

  branchSearch(searchText) {
    this.branchDispatchers.filter(searchText);
  }

  serviceSearch(searchText) {
    // tslint:disable-next-line:no-trailing-whitespace

  }

  handleBranchSelection(branch: IBranch) {
    branch.isSelected = !branch.isSelected;
  }
}
