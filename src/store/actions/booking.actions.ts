import { Action } from '@ngrx/store';

export const SET_BOOKING_NOTE = '[Booking] SET_BOOKING_NOTE';

export class SetBookingNote implements Action {
  readonly type = SET_BOOKING_NOTE;
  constructor(public payload: string) {}
}

// Action types
export type AllBookingActions = SetBookingNote;
