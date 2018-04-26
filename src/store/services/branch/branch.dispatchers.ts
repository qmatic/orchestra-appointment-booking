import { IBranch } from './../../../models/IBranch';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as BranchActions from '../../actions';

@Injectable()
export class BranchDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchBranches() {
    this.store.dispatch(new BranchActions.FetchBranches);
  }

  filterBranches(searchText: string) {
    this.store.dispatch(new BranchActions.FilterBranches(searchText));
  }

  selectBranch(branch: IBranch) {
    this.store.dispatch(new BranchActions.SelectBranch(branch));
  }

  deselectBranch(branch: IBranch) {
    this.store.dispatch(new BranchActions.DeselectBranch(branch));
  }
}
