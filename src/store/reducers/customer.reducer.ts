import { ICustomer } from '../../models/ICustomer';
import * as CustomerActions from '../actions';
import { ILanguage } from '../../models/ILanguage';

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
    case CustomerActions.GET_CUSTOMER_BY_ID: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };
    }
    case CustomerActions.GET_CUSTOMER_BY_ID_SUCCESS: {
      return {
        ...state,
        currentCustomer: [
          ...action.payload.customerList
        ][0],
        loading: false,
        loaded: true,
        error: null
      };
    }
    case CustomerActions.GET_CUSTOMER_BY_ID_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
