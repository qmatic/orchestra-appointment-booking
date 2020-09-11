import { ICustomer } from '../../models/ICustomer';
import * as CustomerActions from '../actions';
import { ILanguage } from '../../models/ILanguage';
import { ILanguageResponse } from '../../models/ILanguageResponse';

export interface ICustomerState {
  customers: ICustomer[];
  currentCustomer: ICustomer;
  searchText: string;
  loading: boolean;
  loaded: boolean;
  error: Object;
  languages: ILanguage[];
}

export const initialState: ICustomerState = {
  customers: [],
  currentCustomer: null,
  searchText: '',
  loaded: false,
  loading: false,
  error: null,
  languages: null
};

export function reducer (
  state: ICustomerState = initialState,
  action: CustomerActions.AllCustomerActions
): ICustomerState {
  switch (action.type) {
    case CustomerActions.UPDATE_CUSTOMER_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload,
        customers: [],
        loaded: false
      };
    }
    case CustomerActions.RESET_CUSTOMER_SEARCH_TEXT: {
      return {
        ...state,
        searchText: '',
        loaded: false
      };
    }
    case CustomerActions.SELECT_CUSTOMER: {
      return {
        ...state,
        currentCustomer: action.payload
      };
    }
    case CustomerActions.RESET_CURRENT_CUSTOMER: {
      return {
        ...state,
        currentCustomer: null
      };
    }
    case CustomerActions.FETCH_CUSTOMERS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };
    }
    case CustomerActions.FETCH_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        customers: [
          ...action.payload.customerList
        ],
        loading: false,
        loaded: true,
        error: null
      };
    }
    case CustomerActions.FETCH_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case CustomerActions.RESET_CUSTOMERS: {
      return {
        ...state,
        customers: [],
        loading: false,
        loaded: false
      };
    }
    case CustomerActions.FETCH_LANGUAGES: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };
    }
    case CustomerActions.FETCH_LANGUAGES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case CustomerActions.FETCH_LANGUAGES_SUCCESS: {
      return {
        ...state,
        languages: action.payload,
        loading: false,
        loaded: false,
        error: null
      };
    }
    default: {
      return state;
    }
  }
}
