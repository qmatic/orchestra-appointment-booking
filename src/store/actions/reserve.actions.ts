import { Action } from '@ngrx/store';
import { IAppointment } from '../../models/IAppointment';
import { IBookingInformation } from '../../models/IBookingInformation';

// Reserve actions
export const RESERVE_APPOINTMENT = '[Reserve] RESERVE_APPOINTMENT';
export const RESERVE_APPOINTMENT_FAIL = '[Reserve] RESERVE_APPOINTMENT_FAIL';
export const RESERVE_APPOINTMENT_SUCCESS = '[Reserve] RESERVE_APPOINTMENT_SUCCESS';

export const UNRESERVE_APPOINTMENT = '[Reserve] UNRESERVE_APPOINTMENT';
export const UNRESERVE_APPOINTMENT_FAIL = '[Reserve] UNRESERVE_APPOINTMENT_FAIL';
export const UNRESERVE_APPOINTMENT_SUCCESS = '[Reserve] UNRESERVE_APPOINTMENT_SUCCESS';


export class ReserveAppointment implements Action {
  readonly type = RESERVE_APPOINTMENT;
  constructor(public payload: { bookingInformation: IBookingInformation, appointment: IAppointment }) {}
}

export class ReserveAppointmentFail implements Action {
  readonly type = RESERVE_APPOINTMENT_FAIL;
  constructor(public payload: any) {}
}

export class ReserveAppointmentSuccess implements Action {
  readonly type = RESERVE_APPOINTMENT_SUCCESS;
  constructor(public payload: IAppointment) {}
}

export class UnreserveAppointment implements Action {
  readonly type = UNRESERVE_APPOINTMENT;
  constructor(public payload: IAppointment) {}
}

export class UnreserveAppointmentFail implements Action {
  readonly type = UNRESERVE_APPOINTMENT_FAIL;
  constructor(public payload: Object) {}
}

export class UnreserveAppointmentSuccess implements Action {
  readonly type = UNRESERVE_APPOINTMENT_SUCCESS;
  constructor(public payload: IAppointment) {}
}

export type AllReserveActions = ReserveAppointment |
                                ReserveAppointmentFail |
                                ReserveAppointmentSuccess |
                                UnreserveAppointment |
                                UnreserveAppointmentFail |
                                UnreserveAppointmentSuccess;
