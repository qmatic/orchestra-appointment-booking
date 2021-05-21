import { Action } from '@ngrx/store';
import { IAppointmentResponse } from '../../models/IAppointmentResponse';

export const FETCH_ACTION_APPOINTMENTS = '[AppointmentHistory] FETCH_ACTION_APPOINTMENTS';
export const FETCH_ACTION_APPOINTMENTS_FAIL = '[AppointmentHistory] FETCH_ACTION_APPOINTMENTS_FAIL';
export const FETCH_ACTION_APPOINTMENTS_SUCCESS = '[AppointmentHistory] FETCH_ACTION_APPOINTMENTS_SUCCESS';
export const FETCH_SELECTED_APPOINTMENT = '[AppointmentHistory] FETCH_SELECTED_APPOINTMENT';
export const FETCH_SELECTED_APPOINTMENT_FAIL = '[AppointmentHistory] FETCH_SELECTED_APPOINTMENT_FAIL';
export const FETCH_SELECTED_APPOINTMENT_SUCCESS = '[AppointmentHistory] FETCH_SELECTED_APPOINTMENT_SUCCESS';
export const FETCH_VISIT_DATA = '[AppointmentHistory] FETCH_VISIT_DATA';
export const FETCH_VISIT_DATA_FAIL = '[AppointmentHistory] FETCH_VISIT_DATA_FAIL';
export const FETCH_VISIT_DATA_SUCCESS = '[AppointmentHistory] FETCH_VISIT_DATA_SUCCESS';
export const RESET_ACTION_APPOINTMENTS = '[AppointmentHistory] RESET_ACTION_APPOINTMENTS';
export const RESET_APPOINTMENT_VISIT = '[AppointmentHistory] RESET_APPOINTMENT_VISIT';
export const SET_TABLE_PAGE_SIZE = '[AppointmentHistory] SET_TABLE_PAGE_SIZE';

export class FetchActionAppointments implements Action {
    readonly type = FETCH_ACTION_APPOINTMENTS;
    constructor(public payload: string) {}
  }
  
  export class FetchActionAppointmentsFail implements Action {
    readonly type = FETCH_ACTION_APPOINTMENTS_FAIL;
    constructor(public payload: Object) {}
  }
  
  export class FetchActionAppointmentsSuccess implements Action {
    readonly type = FETCH_ACTION_APPOINTMENTS_SUCCESS;
    constructor(public payload: IAppointmentResponse) {}
  }
  export class FetchSelectedAppointment implements Action {
    readonly type = FETCH_SELECTED_APPOINTMENT;
    constructor(public payload: number) {}
  }
  
  export class FetchSelectedAppointmentFail implements Action {
    readonly type = FETCH_SELECTED_APPOINTMENT_FAIL;
    constructor(public payload: Object) {}
  }
  
  export class FetchSelectedAppointmentSuccess implements Action {
    readonly type = FETCH_SELECTED_APPOINTMENT_SUCCESS;
    constructor(public payload: any) {}
  }

  export class FetchVisitData implements Action {
    readonly type = FETCH_VISIT_DATA;
    constructor(public payload: number) {}
  }
  
  export class FetchVisitDataFail implements Action {
    readonly type = FETCH_VISIT_DATA_FAIL;
    constructor(public payload: Object) {}
  }
  
  export class FetchVisitDataSuccess implements Action {
    readonly type = FETCH_VISIT_DATA_SUCCESS;
    constructor(public payload: any) {}
  }

  export class ResetActionAppointments implements Action {
    readonly type = RESET_ACTION_APPOINTMENTS;
    constructor() {}
  }

  export class ResetAppointmentVisit implements Action {
    readonly type = RESET_APPOINTMENT_VISIT;
    constructor() {}
  }

  export class SetTablePageSize implements Action {
    readonly type = SET_TABLE_PAGE_SIZE;
    constructor(public payload: number) {}
  }
  

  // Action types
export type AllAppointmentHistoryActions = FetchActionAppointments |
                                        FetchActionAppointmentsSuccess |
                                        FetchActionAppointmentsFail |
                                        FetchVisitData |
                                        FetchVisitDataFail |
                                        FetchVisitDataSuccess |
                                        FetchSelectedAppointment |
                                        FetchSelectedAppointmentFail |
                                        FetchSelectedAppointmentSuccess |
                                        ResetActionAppointments |
                                        ResetAppointmentVisit|
                                        SetTablePageSize;