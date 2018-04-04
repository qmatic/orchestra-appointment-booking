import { Action } from '@ngrx/store';

// Branch list actions
export const FILTER_BRANCH_LIST = '[Branch] FILTER_BRANCH_LIST';
export const FETCH_APPLIED_BRANCH_LIST = '[Branch] FETCH_APPLIED_BRANCH_LIST';


export class FilterBranchList implements Action {
  readonly type = FILTER_BRANCH_LIST;
  constructor(public payload: string) {}
}

export class FetchAppliedBranchList implements Action {
  readonly type = FETCH_APPLIED_BRANCH_LIST;
  constructor(public payload: Object) {}
}

// Action types
export type AllBranchActions = FilterBranchList | FetchAppliedBranchList;
