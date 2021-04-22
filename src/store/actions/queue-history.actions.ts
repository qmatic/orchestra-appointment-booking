import { IAppointmentVisit } from '../../models/IAppointmentVisit';
import { Action } from '@ngrx/store';

// Appointment actions
export const FETCH_VISIT_DATA = '[Appointment] FETCH_APPOINTMENTS';
export const FETCH_VISIT_DATA_FAIL = '[Appointment] FETCH_APPOINTMENTS_FAIL';
export const FETCH_VISIT_DATA_SUCCESS = '[Appointment] FETCH_APPOINTMENTS_SUCCESS';

export class FetchVisitData implements Action {
  readonly type = FETCH_VISIT_DATA;
  constructor(public payload: string) {}
}

export class FetchVisitDataFail implements Action {
  readonly type = FETCH_VISIT_DATA_FAIL;
  constructor(public payload: Object) {}
}

export class FetchVisitDataSuccess implements Action {
  readonly type = FETCH_VISIT_DATA_SUCCESS;
  constructor(public payload: IAppointmentVisit) {}
}

// Action types
export type AllAppointmentActions = FetchVisitData |
                                    FetchVisitDataFail  |
                                    FetchVisitDataSuccess;