import { Action } from '@ngrx/store';
import { IBranchResponse } from '../../models/IBranchResponse';

// Branch list actions
export const FETCH_BRANCHES = '[Branch] FETCH_BRANCHES';
export const FETCH_BRANCHES_FAIL = '[Branch] FETCH_BRANCHES_FAIL';
export const FETCH_BRANCHES_SUCCESS = '[Branch] FETCH_BRANCHES_SUCCESS';

export const FILTER_BRANCH_LIST = '[Branch] FILTER_BRANCH_LIST';
export const FETCH_APPLIED_BRANCH_LIST = '[Branch] FETCH_APPLIED_BRANCH_LIST';

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

export class FilterBranchList implements Action {
  readonly type = FILTER_BRANCH_LIST;
  constructor(public payload: string) {}
}

export class FetchAppliedBranchList implements Action {
  readonly type = FETCH_APPLIED_BRANCH_LIST;
  constructor(public payload: Object) {}
}

// Action types
export type AllBranchActions = FetchBranches |
                                FetchBranchesFail |
                                FetchBranchesSuccess |
                                FilterBranchList |
                                FetchAppliedBranchList;
