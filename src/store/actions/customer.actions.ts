import { Action } from '@ngrx/store';
import { ICustomerResponse } from '../../models/ICustomerResponse';
import { ICustomer } from '../../models/ICustomer';
import { ILanguage } from '../../models/ILanguage';
import { ILanguageResponse } from '../../models/ILanguageResponse';

// Customer actions
export const UPDATE_CUSTOMER_SEARCH_TEXT = '[Customer] UPDATE_CUSTOMER_SEARCH_TEXT';
export const RESET_CUSTOMER_SEARCH_TEXT = '[Customer] RESET_CUSTOMER_SEARCH_TEXT';
export const SELECT_CUSTOMER = '[Customer] SELECT_CUSTOMER';
export const RESET_CURRENT_CUSTOMER = '[Customer] RESET_CURRENT_CUSTOMER';
export const FETCH_CUSTOMERS = '[Customer] FETCH_CUSTOMERS';
export const FETCH_CUSTOMERS_FAIL = '[Customer] FETCH_CUSTOMERS_FAIL';
export const FETCH_CUSTOMERS_SUCCESS = '[Customer] FETCH_CUSTOMERS_SUCCESS';
export const RESET_CUSTOMERS = '[Customer] RESET_CUSTOMERS';
export const CREATE_CUSTOMER = '[Customer] CREATE_CUSTOMER';
export const CREATE_CUSTOMER_FAIL = '[Customer] CREATE_CUSTOMER_FAIL';
export const CREATE_CUSTOMER_SUCCESS = '[Customer] CREATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER = '[Customer] UPDATE_CUSTOMER';
export const UPDATE_CUSTOMER_FAIL = '[Customer] UPDATE_CUSTOMER_FAIL';
export const UPDATE_CUSTOMER_SUCCESS = '[Customer] UPDATE_CUSTOMER_SUCCESS';
export const FETCH_LANGUAGES = '[Customer] FETCH_LANGUAGES';
export const FETCH_LANGUAGES_FAIL = '[Customer] FETCH_LANGUAGES_FAIL';
export const FETCH_LANGUAGES_SUCCESS = '[Customer] FETCH_LANGUAGES_SUCCESS';
export const UPDATE_LANGUAGE = '[Customer] UPDATE_LANGUAGE';
export const UPDATE_LANGUAGE_FAIL = '[Customer] UPDATE_LANGUAGE_FAIL';
export const UPDATE_LANGUAGE_SUCCESS = '[Customer] UPDATE_LANGUAGE_SUCCESS';
export const SET_LANGUAGE = '[Customer] SET_LANGUAGE';
export const SET_LANGUAGE_FAIL = '[Customer] SET_LANGUAGE_FAIL';
export const SET_LANGUAGE_SUCCESS = '[Customer] SET_LANGUAGE_SUCCESS';



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

export class CreateCustomer implements Action {
  readonly type = CREATE_CUSTOMER;
  constructor(public payload: ICustomer) {}
}

export class CreateCustomerFail implements Action {
  readonly type = CREATE_CUSTOMER_FAIL;
  constructor(public payload: Object) {}
}

export class CreateCustomerSuccess implements Action {
  readonly type = CREATE_CUSTOMER_SUCCESS;
  constructor(public payload: ICustomer) {}
}

export class UpdateCustomer implements Action {
  readonly type = UPDATE_CUSTOMER;
  constructor(public payload: ICustomer) {}
}

export class UpdateCustomerFail implements Action {
  readonly type = UPDATE_CUSTOMER_FAIL;
  constructor(public payload: Object) {}
}

export class UpdateCustomerSuccess implements Action {
  readonly type = UPDATE_CUSTOMER_SUCCESS;
  constructor(public payload: ICustomer) {}
}

export class FetchLanguages implements Action {
  readonly type = FETCH_LANGUAGES;
}
export class FetchLanguagesFail implements Action {
  readonly type = FETCH_LANGUAGES_FAIL;
  constructor(public payload: Object) {}
}
export class FetchLanguagesSuccess implements Action {
  readonly type = FETCH_LANGUAGES_SUCCESS;
  constructor(public payload: ILanguage[]) {}
}

export class UpdateLanguage implements Action {
  readonly type = UPDATE_LANGUAGE;
  constructor(public payload: {language: string, branchId: string, visitId: string}) {}
}

export class UpdateLanguageFail implements Action {
  readonly type = UPDATE_LANGUAGE_FAIL;
  constructor(public payload: Object) {}
}

export class UpdateLanguageSuccess implements Action {
  readonly type = UPDATE_LANGUAGE_SUCCESS;
  // constructor(public payload: ICustomer) {}
}



// Action types
export type AllCustomerActions = UpdateCustomerSearchText |
                                  ResetCustomerSearchText |
                                  SelectCustomer |
                                  ResetCurrentCustomer |
                                  FetchCustomers |
                                  FetchCustomersFail |
                                  FetchCustomersSuccess |
                                  ResetCustomers |
                                  CreateCustomer |
                                  CreateCustomerFail |
                                  CreateCustomerSuccess |
                                  UpdateCustomer |
                                  UpdateCustomerFail |
                                  UpdateCustomerSuccess |
                                  FetchLanguages |
                                  FetchLanguagesFail |
                                  FetchLanguagesSuccess |
                                  UpdateLanguage |
                                  UpdateLanguageFail |
                                  UpdateLanguageSuccess
                                  ;
