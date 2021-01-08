import { Action } from '@ngrx/store';

export const SET_APPOINTMENT_NOTIFICATION_TYPE = '[Appointment Meta] SET_APPOINTMENT_NOTIFICATION_TYPE';
export const SET_APPOINTMENT_TITLE = '[Appointment Meta] SET_APPOINTMENT_TITLE';
export const SET_APPOINTMENT_NOTE = '[Appointment Meta] SET_APPOINTMENT_NOTE';
export const RESET_APPOINTMENT_NOTIFICATION_TYPE = '[Appointment Meta] RESET_APPOINTMENT_NOTIFICATION_TYPE';
export const RESET_APPOINTMENT_TITLE = '[Appointment Meta] RESET_APPOINTMENT_TITLE';
export const RESET_APPOINTMENT_NOTE = '[Appointment Meta] RESET_APPOINTMENT_NOTE';
export const RESET_APPOINTMENT_EXTERNAL_NOTE = '[Appointment Meta] RESET_APPOINTMENT_EXTERNAL_NOTE';
export const PRINT_APPOINTMENT_OPTION = '[Appointment Meta] PRINT_APPOINTMENT_OPTION';
export const SET_APPOINTMENT_EXTERNAL_NOTE = '[Appointment Meta] SET_APPOINTMENT_EXTERNAL_NOTE';

export class SetAppointmentNotificationType implements Action {
  readonly type = SET_APPOINTMENT_NOTIFICATION_TYPE;
  constructor(public payload: string) {}
}

export class SetAppointmentTitle implements Action {
  readonly type = SET_APPOINTMENT_TITLE;
  constructor(public payload: string) {}
}

export class SetAppointmentNote implements Action {
  readonly type = SET_APPOINTMENT_NOTE;
  constructor(public payload: string) {}
}

export class ResetAppointmentNotificationType implements Action {
  readonly type = RESET_APPOINTMENT_NOTIFICATION_TYPE;
}

export class ResetAppointmentTitle implements Action {
  readonly type = RESET_APPOINTMENT_TITLE;
}

export class ResetAppointmentNote implements Action {
  readonly type = RESET_APPOINTMENT_NOTE;
}


export class ResetAppointmentExternalNote implements Action {
  readonly type = RESET_APPOINTMENT_EXTERNAL_NOTE;
}

export class PrintAppointmentOption implements Action {
  readonly type = PRINT_APPOINTMENT_OPTION;
  constructor(public payload: boolean) {}
}

export class setExternalNote implements Action {
  readonly type = SET_APPOINTMENT_EXTERNAL_NOTE;
  constructor(public payload: string) {}
}

// Action types
export type AllAppointmentMetaActions = SetAppointmentNotificationType |
                                        SetAppointmentTitle |
                                        SetAppointmentNote |
                                        ResetAppointmentNotificationType |
                                        ResetAppointmentTitle |
                                        ResetAppointmentNote | PrintAppointmentOption | setExternalNote | ResetAppointmentExternalNote;
