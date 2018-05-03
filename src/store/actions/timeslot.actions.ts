import { Action } from '@ngrx/store';
import { IBookingInformation } from '../../models/IBookingInformation';
import { ITimeslotResponse } from '../../models/ITimeslotResponse';

export const FETCH_TIMESLOTS = '[Timeslot] FETCH_TIMESLOTS';
export const FETCH_TIMESLOTS_FAIL = '[Timeslot] FETCH_TIMESLOTS_FAIL';
export const FETCH_TIMESLOTS_SUCCESS = '[Timeslot] FETCH_TIMESLOTS_SUCCESS';
export const SELECT_TIMESLOT = '[Timeslot] SELECT_TIMESLOT';
export const DESELECT_TIMESLOT = '[Timeslot] DESELECT_TIMESLOT';
export const RESET_TIMESLOTS = '[Timeslot] RESET_TIMESLOTS';

export class FetchTimeslots implements Action {
  readonly type = FETCH_TIMESLOTS;
  constructor(public payload: IBookingInformation) {}
}

export class FetchTimeslotsFail implements Action {
  readonly type = FETCH_TIMESLOTS_FAIL;
  constructor(public payload: Object) {}
}

export class FetchTimeslotsSuccess implements Action {
  readonly type = FETCH_TIMESLOTS_SUCCESS;
  constructor(public payload: ITimeslotResponse) {}
}

export class SelectTimeslot implements Action {
  readonly type = SELECT_TIMESLOT;
  constructor(public payload: string) {}
}

export class DeselectTimeslot implements Action {
  readonly type = DESELECT_TIMESLOT;
}

export class ResetTimeslots implements Action {
  readonly type = RESET_TIMESLOTS;
}

// Action types
export type AllTimeslotActions = FetchTimeslots |
                              FetchTimeslotsFail |
                              FetchTimeslotsSuccess |
                              SelectTimeslot |
                              DeselectTimeslot |
                              ResetTimeslots;
