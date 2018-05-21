import { Action } from '@ngrx/store';
import { IAppointment } from '../../models/IAppointment';
import { IBookingInformation } from '../../models/IBookingInformation';

// Booking actions
export const CONFIRM_APPOINTMENT = '[Booking] CONFIRM_APPOINTMENT';
export const CONFIRM_APPOINTMENT_FAIL = '[Booking] CONFIRM_APPOINTMENT_FAIL';
export const CONFIRM_APPOINTMENT_SUCCESS = '[Booking] CONFIRM_APPOINTMENT_SUCCESS';

export const BOOK_APPOINTMENT = '[Booking] BOOK_APPOINTMENT';
export const BOOK_APPOINTMENT_FAIL = '[Booking] BOOK_APPOINTMENT_FAIL';
export const BOOK_APPOINTMENT_SUCCESS = '[Booking] BOOK_APPOINTMENT_SUCCESS';


export class ConfirmAppointment implements Action {
  readonly type = CONFIRM_APPOINTMENT;
  constructor(public payload: { bookingInformation: IBookingInformation, appointment: IAppointment }) {}
}

export class ConfirmAppointmentFail implements Action {
  readonly type = CONFIRM_APPOINTMENT_FAIL;
  constructor(public payload: any) {}
}

export class ConfirmAppointmentSuccess implements Action {
  readonly type = CONFIRM_APPOINTMENT_SUCCESS;
  constructor(public payload: IAppointment) {}
}

export class BookAppointment implements Action {
  readonly type = BOOK_APPOINTMENT;
  constructor(public payload: { bookingInformation: IBookingInformation, appointment: IAppointment }) {}
}

export class BookAppointmentFail implements Action {
  readonly type = BOOK_APPOINTMENT_FAIL;
  constructor(public payload: any) {}
}

export class BookAppointmentSuccess implements Action {
  readonly type = BOOK_APPOINTMENT_SUCCESS;
  constructor(public payload: IAppointment) {}
}

export type AllBookingActions = ConfirmAppointment |
                                ConfirmAppointmentFail |
                                ConfirmAppointmentSuccess |
                                BookAppointment |
                                BookAppointmentFail |
                                BookAppointmentSuccess;
