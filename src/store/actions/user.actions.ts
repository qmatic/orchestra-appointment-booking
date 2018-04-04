import { IUser } from './../../models/IUser';
import { Action } from "@ngrx/store";

// Fetching user info
export const FETCH_USER_INFO = "FETCH_USER_INFO";
export const FETCH_USER_FAIL = "FETCH_USER_FAIL";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";


export class FetchUserInfo implements Action {
  readonly type = FETCH_USER_INFO;
}

export class FetchUserFail implements Action {
  readonly type = FETCH_USER_FAIL;
  constructor(public payload: Object) {}
}

export class FetchUserSuccess implements Action {
  readonly type = FETCH_USER_SUCCESS;
  constructor(public payload: IUser) {}
}

// Action types
export type UserAction = FetchUserInfo | FetchUserFail | FetchUserSuccess;