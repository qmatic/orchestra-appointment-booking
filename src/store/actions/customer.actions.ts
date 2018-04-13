import { Action } from '@ngrx/store';
import { ICustomerResponse } from '../../models/ICustomerResponse';
import { ICustomer } from '../../models/ICustomer';

// Customer search actions
export const UPDATE_CUSTOMER_SEARCH_TEXT = '[Customer] UPDATE_CUSTOMER_SEARCH_TEXT';
export const RESET_CUSTOMER_SEARCH_TEXT = '[Customer] RESET_CUSTOMER_SEARCH_TEXT';
export const SELECT_CUSTOMER = '[Customer] SELECT_CUSTOMER';
export const RESET_CURRENT_CUSTOMER = '[Customer] RESET_CURRENT_CUSTOMER';
export const FETCH_CUSTOMERS = '[Customer] FETCH_CUSTOMERS';
export const FETCH_CUSTOMERS_FAIL = '[Customer] FETCH_CUSTOMERS_FAIL';
export const FETCH_CUSTOMERS_SUCCESS = '[Customer] FETCH_CUSTOMERS_SUCCESS';
export const RESET_CUSTOMERS = '[Customer] RESET_CUSTOMERS';

export class UpdateCustomerSearchText implements Action {
  readonly type = UPDATE_CUSTOMER_SEARCH_TEXT;
  constructor(public payload: string) {}
}

export class ResetCustomerSearchText implements Action {
  readonly type = RESET_CUSTOMER_SEARCH_TEXT;
}

export class SelectCustomer implements Action {
  readonly type = SELECT_CUSTOMER;
  constructor(public payload: ICustomer) {}
}

export class ResetCurrentCustomer implements Action {
  readonly type = RESET_CURRENT_CUSTOMER;
}

export class FetchCustomers implements Action {
  readonly type = FETCH_CUSTOMERS;
  constructor(public payload: string) {}
}

export class FetchCustomersFail implements Action {
  readonly type = FETCH_CUSTOMERS_FAIL;
  constructor(public payload: Object) {}
}

export class FetchCustomersSuccess implements Action {
  readonly type = FETCH_CUSTOMERS_SUCCESS;
  constructor(public payload: ICustomerResponse) {}
}

export class ResetCustomers implements Action {
  readonly type = RESET_CUSTOMERS;
}

// Action types
export type AllCustomerActions = UpdateCustomerSearchText |
                                  ResetCustomerSearchText |
                                  SelectCustomer |
                                  ResetCurrentCustomer |
                                  FetchCustomers |
                                  FetchCustomersFail |
                                  FetchCustomersSuccess |
                                  ResetCustomers;
