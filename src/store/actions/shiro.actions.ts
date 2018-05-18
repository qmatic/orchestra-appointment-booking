import { Action } from '@ngrx/store';

export const START_REFRESH = '[Shiro] START_REFRESH';
export const SHIRO_REFRESH_SUCCESS = '[Shiro] SHIRO_REFRESH_SUCCESS';
export const SHIRO_REFRESH_ERROR = '[Shiro] SHIRO_REFRESH_SUCCESS';

export class StartRefresh implements Action {
    readonly type = START_REFRESH;
}

export class ShiroRefreshSuccess implements Action {
  readonly type = SHIRO_REFRESH_SUCCESS;
}

export class ShiroRefreshError implements Action {
readonly type = SHIRO_REFRESH_ERROR;
}

// Action types
export type AllShiroActions = StartRefresh;
