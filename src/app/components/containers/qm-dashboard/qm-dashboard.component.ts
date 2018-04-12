import { IBranch } from './../../../../models/IBranch';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BranchSelectors, BranchDispatchers } from '../../../../store';

@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss']
})
export class QmDashboardComponent implements OnInit {
  branches$: Observable<IBranch[]>;
  services: Array<any>;
  constructor(
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers
  ) {
    this.branches$ = this.branchSelectors.filteredBranches$;
    this.services = [{name: 'AR/VR Demo'}, {name: 'Car alarm system'}, {name: 'Extended warranty'}];
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
