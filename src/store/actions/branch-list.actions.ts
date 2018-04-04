import { Action } from "@ngrx/store";

// Fetching user info
export const FILTER_BRANCH_LIST = "FILTER_BRANCH_LIST";
export const FILTER_APPLIED_BRANCH_LIST = "FILTER_APPLIED_BRANCH_LIST";


export class FilterBranchList implements Action {
  readonly type = FILTER_BRANCH_LIST;
}

export class FetchAppliedBranchList implements Action {
  readonly type = FILTER_APPLIED_BRANCH_LIST;
  constructor(public payload: Object) {}
}

// Action types
export type BranchListAction = FilterBranchList | FetchAppliedBranchList;