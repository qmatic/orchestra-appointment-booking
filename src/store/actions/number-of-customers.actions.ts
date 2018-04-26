import { Action } from '@ngrx/store';

export const SET_NUMBER_OF_CUSTOMERS = '[Number Of Customers] SET_NUMBER_OF_CUSTOMERS';
export const RESET_NUMBER_OF_CUSTOMERS = '[Number Of Customers] RESET_NUMBER_OF_CUSTOMERS';

export class SetNumberOfCustomers implements Action {
  readonly type = SET_NUMBER_OF_CUSTOMERS;
  constructor(public payload: number) {}
}

export class ResetNumberOfCustomers implements Action {
  readonly type = RESET_NUMBER_OF_CUSTOMERS;
}

// Action types
export type AllNumberOfCustomersActions = SetNumberOfCustomers |
                                          ResetNumberOfCustomers;
