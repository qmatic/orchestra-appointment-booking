import { Setting } from './../../models/Setting';
import { ISettingsResponse, ISettingsUpdateRequest } from './../../models/ISettingsResponse';
import { IBranch } from './../../models/IBranch';
import { Action } from '@ngrx/store';

// Settings admin list actions
export const FETCH_SETTINGS = '[Settings] FETCH_SETTINGS';
export const FETCH_SETTINGS_FAIL = '[Settings] FETCH_SETTINGS_FAIL';
export const FETCH_SETTINGS_SUCCESS = '[Settings] FETCH_SETTINGS_SUCCESS';
export const SAVE_SETTINGS = '[Settings] SAVE_SETTINGS';
export const SAVE_SETTINGS_SUCCESS = '[Settings] SAVE_SETTINGS_SUCESS';
export const SAVE_SETTINGS_FAIL = '[Settings] SAVE_SETTINGS_FAIL';
export const UPDATE_SETTINGS_STORE = '[Settings] UPDATE_SETTINGS_STORE';

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

export class SaveSettings implements Action {
  readonly type = SAVE_SETTINGS;
  constructor(public payload: ISettingsUpdateRequest) {}
}

export class SaveSettingsSuccess implements Action {
  readonly type = SAVE_SETTINGS_SUCCESS;
  constructor(public payload: ISettingsUpdateRequest) {}
}

export class UpdateSettingsStore implements Action {
  readonly type = UPDATE_SETTINGS_STORE;
  constructor(public payload: Setting[]) {}
}

export class SaveSettingsFail implements Action {
  readonly type = SAVE_SETTINGS_FAIL;
  constructor(public payload: any) {}
}

export type AllSettingsActions = UpdateSettingsStore| SaveSettings | SaveSettingsSuccess | SaveSettingsFail |
                                 FetchSettingsSuccess | FetchSettings | FetchSettingsFail;
