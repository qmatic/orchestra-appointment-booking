import { ICalendarSetting } from './../../models/ICalendarSetting';
import { Action } from '@ngrx/store';

// Fetching user info
export const FETCH_CALENDAR_SETTINGS_INFO =
  '[Settings] FETCH_CALENDAR_SETTINGS_INFO';
export const FETCH_CALENDAR_SETTINGS_FAIL =
  '[Settings] FETCH_CALENDAR_SETTINGS_FAIL';
export const FETCH_CALENDAR_SETTINGS_SUCCESS =
  '[Settings] FETCH_CALENDAR_SETTINGS_SUCCESS';

export class FetchCalendarSettingsInfo implements Action {
  readonly type = FETCH_CALENDAR_SETTINGS_INFO;
}

export class FetchCalendarSettingsInfoFail implements Action {
  readonly type = FETCH_CALENDAR_SETTINGS_FAIL;
  constructor(public payload: Object) {}
}

export class FetchCalendarSettingsInfoSuccess implements Action {
  readonly type = FETCH_CALENDAR_SETTINGS_SUCCESS;
  constructor(public payload: { data: ICalendarSetting }) {}
}

// Action types
export type AllCalendarSettingsActions =
  | FetchCalendarSettingsInfo
  | FetchCalendarSettingsInfoFail
  | FetchCalendarSettingsInfoSuccess;
