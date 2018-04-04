import { Action } from '@ngrx/store';
import { IUser } from './../../models/IUser';
import { DataAction, DataErrorAction } from './data.actions';
import { DataServiceError } from '../services';

// Fetching user info
export const FETCH_USER_INFO = '[User] FETCH_USER_INFO';
export const FETCH_USER_INFO_FAIL = '[User] FETCH_USER_INFO_FAIL';
export const FETCH_USER_INFO_SUCCESS = '[User] FETCH_USER_SUCCESS';

export class FetchUserInfo implements Action {
  readonly type = FETCH_USER_INFO;
}

export class FetchUserInfoFail implements Action {
  readonly type = FETCH_USER_INFO_FAIL;
  constructor(public payload: Object) {}
}

export class FetchUserInfoSuccess implements Action {
  readonly type = FETCH_USER_INFO_SUCCESS;
  constructor(public payload: IUser) {}
}

// Action types
export type AllUserActions = FetchUserInfo
                        | FetchUserInfoFail
                        | FetchUserInfoSuccess;
