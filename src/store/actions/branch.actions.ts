import { IBranch } from './../../models/IBranch';
import { Action } from '@ngrx/store';
import { IBranchResponse } from '../../models/IBranchResponse';

// Branch list actions
export const FETCH_BRANCHES = '[Branch] FETCH_BRANCHES';
export const FETCH_BRANCHES_FAIL = '[Branch] FETCH_BRANCHES_FAIL';
export const FETCH_BRANCHES_SUCCESS = '[Branch] FETCH_BRANCHES_SUCCESS';
export const SELECT_BRANCH = '[Branch] SELECT_BRANCH';
export const DESELECT_BRANCH = '[Branch] DESELECT_BRANCH';

export const FILTER_BRANCHES = '[Branch] FILTER_BRANCHES';
export const RESET_FILTER_BRANCHES = '[Branch] RESET_FILTER_BRANCHES';

export class FetchBranches implements Action {
  readonly type = FETCH_BRANCHES;
}

export class FetchBranchesFail implements Action {
  readonly type = FETCH_BRANCHES_FAIL;
  constructor(public payload: Object) {}
}

export class FetchBranchesSuccess implements Action {
  readonly type = FETCH_BRANCHES_SUCCESS;
  constructor(public payload: IBranchResponse) {}
}

export class SelectBranch implements Action {
  readonly type = SELECT_BRANCH;
  constructor(public payload: IBranch) {}
}

export class DeselectBranch implements Action {
  readonly type = DESELECT_BRANCH;
}

export class FilterBranches implements Action {
  readonly type = FILTER_BRANCHES;
  constructor(public payload: string) {}
}

export class ResetFilterBranches implements Action {
  readonly type = RESET_FILTER_BRANCHES;
}


export type AllBranchActions = FetchBranches |
                                FetchBranchesFail |
                                FetchBranchesSuccess |
                                FilterBranches |
                                ResetFilterBranches |
                                SelectBranch |
                                DeselectBranch;
