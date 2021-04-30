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
export const FETCH_APPOINTMENT_EMAIL_TEMPLETE = '[Appointment] FETCH_APPOINTMENT_EMAIL_TEMPLETE';
export const FETCH_APPOINTMENT_EMAIL_TEMPLETE_FAIL = '[Appointment] FETCH_APPOINTMENT_EMAIL_TEMPLETE_FAIL';
export const FETCH_APPOINTMENT_EMAIL_TEMPLETE_SUCCESS = '[Appointment] FETCH_APPOINTMENT_EMAIL_TEMPLETE_SUCCESS';
export const RESEND_APPOINTMENT_COMFIRMATION = '[Appointment] RESEND_APPOINTMENT_COMFIRMATION';
export const RESEND_APPOINTMENT_COMFIRMATION_FAIL = '[Appointment] RESEND_APPOINTMENT_COMFIRMATION_FAIL';
export const RESEND_APPOINTMENT_COMFIRMATION_SUCCESS = '[Appointment] RESEND_APPOINTMENT_COMFIRMATION_SUCCESS';
export const SET_RESEND_APPOINTMENT = '[Appointment] SET_RESEND_APPOINTMENT';
export const RESET_APPOINTMENT_LOADED = '[Appointment] RESET_APPOINTMENT_LOADED';
export const FETCH_APPOINTMENT_LIST = '[Appointment] FETCH_APPOINTMENTS_LIST';
export const FETCH_APPOINTMENT_LIST_FAIL = '[Appointment] FETCH_APPOINTMENT_LIST_FAIL';
export const FETCH_APPOINTMENT_LIST_SUCCESS = '[Appointment] FETCH_APPOINTMENT_LIST_SUCCESS';
export const RESET_APPOINTMENT_LIST = '[Appointment] RESET_APPOINTMENT_LIST';


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
export class FetchAppointmentList implements Action {
  readonly type = FETCH_APPOINTMENT_LIST;
  constructor(public payload: { fromDate: string, toDate: string, branchId: string }) {}
}

export class FetchAppointmentListFail implements Action {
  readonly type = FETCH_APPOINTMENT_LIST_FAIL;
  constructor(public payload: Object) {}
}

export class FetchAppointmentListSuccess implements Action {
  readonly type = FETCH_APPOINTMENT_LIST_SUCCESS;
  constructor(public payload: IAppointment[]) {}
}

export class ResetAppointmentList implements Action {
  readonly type = RESET_APPOINTMENT_LIST;
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


export class FetchAppointmentEmailTemplete implements Action {
  readonly type = FETCH_APPOINTMENT_EMAIL_TEMPLETE;
  constructor(public payload: string) {}
}

export class FetchAppointmentEmailTempleteFail implements Action {
  readonly type = FETCH_APPOINTMENT_EMAIL_TEMPLETE_FAIL;
  constructor(public payload: Object) {}
}

export class FetchAppointmentEmailTempleteSuccess implements Action {
  readonly type = FETCH_APPOINTMENT_EMAIL_TEMPLETE_SUCCESS;
  constructor(public payload: string) {}
}


export class ResendAppointmentConfrimaton implements Action {
  readonly type = RESEND_APPOINTMENT_COMFIRMATION;
  constructor(public payload: IAppointment) {}
}

export class ResendAppointmentConfrimatonFail implements Action {
  readonly type = RESEND_APPOINTMENT_COMFIRMATION_FAIL;
  constructor(public payload: Object) {}
}

export class ResendAppointmentConfrimatonSuccess implements Action {
  readonly type = RESEND_APPOINTMENT_COMFIRMATION_SUCCESS;
  constructor() {}
}

export class SetResendAppointmentId implements Action {
  readonly type = SET_RESEND_APPOINTMENT;
  constructor(public payload: string) {}
}

export class ResetAppointmentLoaded implements Action {
  readonly type = RESET_APPOINTMENT_LOADED;
  constructor() {}
}
// Action types
export type AllAppointmentActions = FetchAppointments |
                                    FetchAppointmentsFail |
                                    FetchAppointmentsSuccess |
                                    FetchAppointmentList |
                                    FetchAppointmentListSuccess |
                                    FetchAppointmentListFail |
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
                                    SetAppointmentStatEventSuccess|
                                    FetchAppointmentEmailTemplete|
                                    FetchAppointmentEmailTempleteFail |
                                    FetchAppointmentEmailTempleteSuccess |
                                    ResendAppointmentConfrimaton |
                                    ResendAppointmentConfrimatonFail |
                                    ResendAppointmentConfrimatonSuccess|
                                    SetResendAppointmentId|
                                    ResetAppointmentLoaded|
                                    ResetAppointmentList |
                                    ResetAppointmentLoaded;

