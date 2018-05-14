import { Action } from '@ngrx/store';

export const SET_RESERVATION_EXPIRY_TIME =
  '[reservation-expiry-timer] SET_RESERVATION_EXPIRY_TIME';
export const HIDE_RESERVATION_EXPIRY_TIMER =
  '[reservation-expiry-timer] HIDE_RESERVATION_EXPIRY_TIMER';
export const SHOW_RESERVATION_EXPIRY_TIMER =
  '[reservation-expiry-timer] SHOW_RESERVATION_EXPIRY_TIMER';

export class SetReservationExpiryTime implements Action {
  readonly type = SET_RESERVATION_EXPIRY_TIME;
  constructor(public payload: number) {}
}

export class HideReservationExpiryTimer implements Action {
  readonly type = HIDE_RESERVATION_EXPIRY_TIMER;
}

export class ShowReservationExpiryTimer implements Action {
  readonly type = SHOW_RESERVATION_EXPIRY_TIMER;
}

// Action types
export type AllReservationTimerActions =
  | SetReservationExpiryTime
  | HideReservationExpiryTimer
  | ShowReservationExpiryTimer;
