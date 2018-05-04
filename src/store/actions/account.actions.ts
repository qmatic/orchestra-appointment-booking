import { Action } from '@ngrx/store';
import { IAccount } from './../../models/IAccount';

// Fetching user info
export const FETCH_ACCOUNT_INFO = '[Account] FETCH_ACCOUNT_INFO';
export const FETCH_ACCOUNT_INFO_FAIL = '[Account] FETCH_ACCOUNT_INFO_FAIL';
export const FETCH_ACCOUNT_INFO_SUCCESS =
  '[Account] FETCH_ACCOUNT_INFO_SUCCESS';

export class FetchAccountInfo implements Action {
  readonly type = FETCH_ACCOUNT_INFO;
}

export class FetchAccountInfoFail implements Action {
  readonly type = FETCH_ACCOUNT_INFO_FAIL;
  constructor(public payload: Object) {}
}

export class FetchAccountInfoSuccess implements Action {
  readonly type = FETCH_ACCOUNT_INFO_SUCCESS;
  constructor(public payload: { data: IAccount; userRole: string }) {}
}

// Action types
export type AllAccountActions =
  | FetchAccountInfo
  | FetchAccountInfoFail
  | FetchAccountInfoSuccess;
