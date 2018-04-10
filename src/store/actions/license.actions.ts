import { ILicense } from './../../models/ILicense';
import { Action } from '@ngrx/store';

export const FETCH_LICENSE_INFO = '[License] FETCH_LICENSE_INFO';
export const FETCH_LICENSE_INFO_SUCCESS = '[License] FETCH_LICENSE_INFO_SUCCESS';
export const FETCH_LICENSE_INFO_FAIL = '[License] FETCH_LICENSE_INFO_FAIL';

export class FetchLicenseInfo implements Action {
  readonly type = FETCH_LICENSE_INFO;
}

export class FetchLicenseFail implements Action {
  readonly type = FETCH_LICENSE_INFO_FAIL;
  constructor(public payload: Object) {}
}

export class FetchLicenseInfoSuccess implements Action {
  readonly type = FETCH_LICENSE_INFO_SUCCESS;
  constructor(public payload: boolean) {}
}

// Action types
export type AllLicenseActions = FetchLicenseInfo | FetchLicenseFail | FetchLicenseInfoSuccess;
