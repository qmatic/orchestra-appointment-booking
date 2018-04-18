import { Action } from '@ngrx/store';

export const SET_APPOINTMENT_NOTIFICATION_TYPE = '[Appointment Meta] SET_APPOINTMENT_NOTIFICATION_TYPE';
export const SET_APPOINTMENT_TITLE = '[Appointment Meta] SET_APPOINTMENT_TITLE';
export const SET_APPOINTMENT_NOTE = '[Appointment Meta] SET_APPOINTMENT_NOTE';

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

// Action types
export type AllAppointmentMetaActions = SetAppointmentNotificationType |
                                        SetAppointmentTitle |
                                        SetAppointmentNote;
