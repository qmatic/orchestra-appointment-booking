import { Action } from '@ngrx/store';
import { IAppointmentResponse } from '../../models/IAppointmentResponse';

// Branch list actions
export const FETCH_APPOINTMENTS = '[Appointment] FETCH_APPOINTMENTS';
export const FETCH_APPOINTMENTS_FAIL = '[Appointment] FETCH_APPOINTMENTS_FAIL';
export const FETCH_APPOINTMENTS_SUCCESS = '[Appointment] FETCH_APPOINTMENTS_SUCCESS';
export const RESET_APPOINTMENTS = '[Appointment] RESET_APPOINTMENTS';

export class FetchAppointments implements Action {
  readonly type = FETCH_APPOINTMENTS;
  constructor(public payload: string) {}
}

export class FetchAppointmentsFail implements Action {
  readonly type = FETCH_APPOINTMENTS_FAIL;
  constructor(public payload: Object) {}
}

export class FetchAppointmentsSuccess implements Action {
  readonly type = FETCH_APPOINTMENTS_SUCCESS;
  constructor(public payload: IAppointmentResponse) {}
}

export class ResetAppointments implements Action {
  readonly type = RESET_APPOINTMENTS;
}

// Action types
export type AllAppointmentActions = FetchAppointments |
                                FetchAppointmentsFail |
                                FetchAppointmentsSuccess |
                                ResetAppointments;
