import { ISystemInfo } from './../../models/ISystemInfo';
import { Action } from "@ngrx/store";

// Fetching user info
export const FETCH_SYSTEM_INFO = "FETCH_SYSTEM_INFO";
export const FETCH_SYSTEM_INFO_FAIL = "FETCH_SYSTEM_INFO_FAIL";
export const FETCH_SYSTEM_INFO_SUCCESS = "FETCH_SYSTEM_INFO_SUCCESS";


export class FetchSystemInfo implements Action {
  readonly type = FETCH_SYSTEM_INFO;
}

export class FetchSystemInfoFail implements Action {
  readonly type = FETCH_SYSTEM_INFO_FAIL;
  constructor(public payload: Object) {}
}

export class FetchSystemInfoSuccess implements Action {
  readonly type = FETCH_SYSTEM_INFO_SUCCESS;
  constructor(public payload: ISystemInfo) {}
}

// Action types
export type SystemInfoAction = FetchSystemInfo | FetchSystemInfoFail | FetchSystemInfoSuccess;