import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IBranch } from './../models/IBranch';
import { IAppState } from '../store/reducers';
import { UserSelectors, BranchSelectors } from '../store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userFullName$: Observable<string>;
  userDirection$: Observable<string>;
  branches$: Observable<IBranch[]>;

  constructor(
    private userSelectors: UserSelectors,
    private branchSelectors: BranchSelectors
  ) {
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.branches$ = this.branchSelectors.filteredBranches$;
  }
}
