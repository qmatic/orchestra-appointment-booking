import { Action } from '@ngrx/store';
import { IAppointmentResponse } from '../../models/IAppointmentResponse';
import { IAppointment } from '../../models/IAppointment';

// Appointment actions
export const FETCH_APPOINTMENTS = '[Appointment] FETCH_APPOINTMENTS';
export const FETCH_APPOINTMENTS_FAIL = '[Appointment] FETCH_APPOINTMENTS_FAIL';
export const FETCH_APPOINTMENTS_SUCCESS = '[Appointment] FETCH_APPOINTMENTS_SUCCESS';
export const RESET_APPOINTMENTS = '[Appointment] RESET_APPOINTMENTS';
export const DELETE_APPOINTMENT = '[Appointment] DELETE_APPOINTMENT';
export const DELETE_APPOINTMENT_FAIL = '[Appointment] DELETE_APPOINTMENT_FAIL';
export const DELETE_APPOINTMENT_SUCCESS = '[Appointment] DELETE_APPOINTMENT_SUCCESS';
export const SELECT_APPOINTMENT = '[Appointment] SELECT_APPOINTMENT';
export const RESET_APPOINTMENT = '[Appointment] RESET_APPOINTMENT';
export const FETCH_APPOINTMENT_QP = '[Appointment] FETCH_APPOINTMENT_QP';
export const FETCH_APPOINTMENT_QP_FAIL = '[Appointment] FETCH_APPOINTMENT_QP_FAIL';
export const FETCH_APPOINTMENT_QP_SUCCESS = '[Appointment] FETCH_APPOINTMENT_QP_SUCCESS';
export const SET_APPOINTMENT_STAT_EVENT = '[Appointment] SET_APPOINTMENT_STAT_EVENT';
export const SET_APPOINTMENT_STAT_EVENT_FAIL = '[Appointment] SET_APPOINTMENT_STAT_EVENT_FAIL';
export const SET_APPOINTMENT_STAT_EVENT_SUCCESS = '[Appointment] SET_APPOINTMENT_STAT_EVENT_SUCCESS';


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

export class FetchAppointmentQP implements Action {
  readonly type = FETCH_APPOINTMENT_QP;
  constructor(public payload: string) {}
}

export class FetchAppointmentQPFail implements Action {
  readonly type = FETCH_APPOINTMENT_QP_FAIL;
  constructor(public payload: Object) {}
}

export class FetchAppointmentQPSuccess implements Action {
  readonly type = FETCH_APPOINTMENT_QP_SUCCESS;
  constructor(public payload: Object) {}
}

export class SetAppointmentStatEvent implements Action {
  readonly type = SET_APPOINTMENT_STAT_EVENT;
  constructor(public payload: IAppointment) {}
}

export class SetAppointmentStatEventFail implements Action {
  readonly type = SET_APPOINTMENT_STAT_EVENT_FAIL;
  constructor(public payload: Object) {}
}

export class SetAppointmentStatEventSuccess implements Action {
  readonly type = SET_APPOINTMENT_STAT_EVENT_SUCCESS;
  constructor(public payload: IAppointment) {}
}

export class ResetAppointments implements Action {
  readonly type = RESET_APPOINTMENTS;
}

export class DeleteAppointment implements Action {
  readonly type = DELETE_APPOINTMENT;
  constructor(public payload: IAppointment) {}
}

export class DeleteAppointmentFail implements Action {
  readonly type = DELETE_APPOINTMENT_FAIL;
  constructor(public payload: Object) {}
}

export class DeleteAppointmentSuccess implements Action {
  readonly type = DELETE_APPOINTMENT_SUCCESS;
  constructor(public payload: IAppointment) {}
}

export class SelectAppointment implements Action {
  readonly type = SELECT_APPOINTMENT;
  constructor(public payload: IAppointment) {}
}

export class ResetAppointment implements Action {
  readonly type = RESET_APPOINTMENT;
}

// Action types
export type AllAppointmentActions = FetchAppointments |
                                    FetchAppointmentsFail |
                                    FetchAppointmentsSuccess |
                                    ResetAppointments |
                                    DeleteAppointment |
                                    DeleteAppointmentFail |
                                    DeleteAppointmentSuccess |
                                    SelectAppointment |
                                    ResetAppointment |
                                    FetchAppointmentQP |
                                    FetchAppointmentQPFail |
                                    FetchAppointmentQPSuccess |
                                    SetAppointmentStatEvent |
                                    SetAppointmentStatEventFail |
                                    SetAppointmentStatEventSuccess;
