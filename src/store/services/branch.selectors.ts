import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../reducers';
import { IBranchState } from '../reducers/branch.reducer';

// selectors
const getBranchState = createFeatureSelector<IBranchState>('branches');

const getAllBranches = createSelector(
  getBranchState,
  (state: IBranchState) => state.branches
);

const getSelectedBranch = createSelector(
  getBranchState,
  (state: IBranchState) => state.selectedBranch
);

const getFilteredBranches = createSelector(
  getBranchState,
  (state: IBranchState) => state.filteredBranches
);

@Injectable()
export class BranchSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  branches$ = this.store.select(getAllBranches);
  selectedBranch$ = this.store.select(getSelectedBranch);
  filteredBranches$ = this.store.select(getFilteredBranches);
}
