import { ISettingsResponse } from './../../models/ISettingsResponse';
import { IBranch } from './../../models/IBranch';
import { Action } from '@ngrx/store';

// Settings admin list actions
export const FETCH_SETTINGS = '[Settings] FETCH_SETTINGS';
export const FETCH_SETTINGS_FAIL = '[Settings] FETCH_SETTINGS_FAIL';
export const FETCH_SETTINGS_SUCCESS = '[Settings] FETCH_SETTINGS_SUCCESS';

export class FetchSettings implements Action {
  readonly type = FETCH_SETTINGS;
}

export class FetchSettingsFail implements Action {
  readonly type = FETCH_SETTINGS_FAIL;
  constructor(public payload: Object) {}
}

export class FetchSettingsSuccess implements Action {
  readonly type = FETCH_SETTINGS_SUCCESS;
  constructor(public payload: ISettingsResponse) {}
}
export type AllSettingsActions = FetchSettingsSuccess | FetchSettings | FetchSettingsFail;
