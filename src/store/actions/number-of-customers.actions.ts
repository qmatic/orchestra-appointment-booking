import { Action } from '@ngrx/store';

export const SET_NUMBER_OF_CUSTOMERS = '[Number Of Customers] SET_NUMBER_OF_CUSTOMERS';

export class SetNumberOfCustomers implements Action {
  readonly type = SET_NUMBER_OF_CUSTOMERS;
  constructor(public payload: number) {}
}

// Action types
export type AllNumberOfCustomersActions = SetNumberOfCustomers;
