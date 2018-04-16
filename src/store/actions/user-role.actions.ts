import { Action } from '@ngrx/store';

// Fetching user info
export const FETCH_USER_ROLE_INFO = '[User Role] FETCH_USER_ROLE_INFO';
export const FETCH_USER_ROLE_FAIL = '[User Role] FETCH_USER_ROLE_FAIL';
export const FETCH_USER_ROLE_SUCCESS = '[User Role] FETCH_USER_ROLE_SUCCESS';

export class FetchUserRoleInfo implements Action {
  readonly type = FETCH_USER_ROLE_INFO;
}

export class FetchUserRoleInfoFail implements Action {
  readonly type = FETCH_USER_ROLE_FAIL;
  constructor(public payload: Object) {}
}

export class FetchUserRoleInfoSuccess implements Action {
  readonly type = FETCH_USER_ROLE_SUCCESS;
  constructor(public payload: string) {}
}

// Action types
export type AllUserRoleActions = FetchUserRoleInfo | FetchUserRoleInfoFail | FetchUserRoleInfoSuccess;
