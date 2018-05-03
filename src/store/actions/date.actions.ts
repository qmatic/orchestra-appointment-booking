import { Action } from '@ngrx/store';
import { IBookingInformation } from '../../models/IBookingInformation';
import { IDatesResponse } from '../../models/IDatesResponse';

export const FETCH_DATES = '[Date] FETCH_DATES';
export const FETCH_DATES_FAIL = '[Date] FETCH_DATES_FAIL';
export const FETCH_DATES_SUCCESS = '[Date] FETCH_DATES_SUCCESS';
export const SELECT_DATE = '[Date] SELECT_DATE';
export const DESELECT_DATE = '[Date] DESELECT_DATE';
export const RESET_DATES = '[Date] RESET_DATES';
export const FILTER_DATES = '[Date] FILTER_DATES';
export const RESET_FILTER_DATES = '[Date] RESET_FILTER_DATES';

export class FetchDates implements Action {
  readonly type = FETCH_DATES;
  constructor(public payload: IBookingInformation) {}
}

export class FetchDatesFail implements Action {
  readonly type = FETCH_DATES_FAIL;
  constructor(public payload: Object) {}
}

export class FetchDatesSuccess implements Action {
  readonly type = FETCH_DATES_SUCCESS;
  constructor(public payload: IDatesResponse) {}
}

export class SelectDate implements Action {
  readonly type = SELECT_DATE;
  constructor(public payload: string) {}
}

export class DeselectDate implements Action {
  readonly type = DESELECT_DATE;
}

export class ResetDates implements Action {
  readonly type = RESET_DATES;
}

export class FilterDates implements Action {
  readonly type = FILTER_DATES;
  constructor(public payload: string) {}
}

export class ResetFilterDates implements Action {
  readonly type = RESET_FILTER_DATES;
}

// Action types
export type AllDateActions = FetchDates |
                              FetchDatesFail |
                              FetchDatesSuccess |
                              SelectDate |
                              DeselectDate |
                              ResetDates |
                              FilterDates |
                              ResetFilterDates;
