// Action constants and Action creators
import { Action } from "@ngrx/store";
import { ISystemInformation } from "../../models/system.model";

// SYSTEM ACTIONS
export const LOAD_SYSTEM_INFORMATION = "[SYSTEM] LOAD_SYSTEM_INFORMATION";
export const LOAD_SYSTEM_INFORMATION_SUCCESS = "[SYSTEM] LOAD_SYSTEM_INFORMATION_SUCCESS";
export const LOAD_SYSTEM_INFORMATION_FAIL = "[SYSTEM] LOAD_SYSTEM_INFORMATION_FAIL";

export class LoadSystemInformation implements Action {
  readonly type = LOAD_SYSTEM_INFORMATION;
}

export class LoadSystemInformationSuccess implements Action {
  readonly type = LOAD_SYSTEM_INFORMATION_SUCCESS;
  constructor(public payload: ISystemInformation) {}
}

export class LoadSystemInformationFail implements Action {
  readonly type = LOAD_SYSTEM_INFORMATION_FAIL;
  constructor(public payload: any) {}
}

// Action types
export type SystemAction = LoadSystemInformation | LoadSystemInformationSuccess | LoadSystemInformationFail;
