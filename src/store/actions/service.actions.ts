import { Action } from '@ngrx/store';
import { IServiceResponse } from '../../models/IServiceResponse';

// Service actions
export const FETCH_SERVICES = '[Service] FETCH_SERVICES';
export const FETCH_SERVICES_FAIL = '[Service] FETCH_SERVICES_FAIL';
export const FETCH_SERVICES_SUCCESS = '[Service] FETCH_SERVICES_SUCCESS';

export class FetchServices implements Action {
  readonly type = FETCH_SERVICES;
}

export class FetchServicesFail implements Action {
  readonly type = FETCH_SERVICES_FAIL;
  constructor(public payload: Object) {}
}

export class FetchServicesSuccess implements Action {
  readonly type = FETCH_SERVICES_SUCCESS;
  constructor(public payload: IServiceResponse) {}
}

// Action types
export type AllServiceActions = FetchServices |
                                FetchServicesFail |
                                FetchServicesSuccess;
