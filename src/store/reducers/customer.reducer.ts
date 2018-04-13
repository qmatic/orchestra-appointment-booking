import { ICustomer } from '../../models/ICustomer';
import * as CustomerActions from '../actions';

export interface ICustomerState {
  customers: ICustomer[];
  currentCustomer: ICustomer;
  searchText: string;
  loading: boolean;
  error: Object;
}

export const initialState: ICustomerState = {
  customers: [],
  currentCustomer: null,
  searchText: '',
  loading: false,
  error: null
};

export function reducer (
  state: ICustomerState = initialState,
  action: CustomerActions.AllCustomerActions
): ICustomerState {
  switch (action.type) {
    case CustomerActions.UPDATE_CUSTOMER_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload
      };
    }
    case CustomerActions.RESET_CUSTOMER_SEARCH_TEXT: {
      return {
        ...state,
        searchText: ''
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
        error: null
      };
    }
    case CustomerActions.FETCH_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case CustomerActions.RESET_CUSTOMERS: {
      return {
        ...state,
        customers: []
      };
    }
    default: {
        return state;
    }
  }
}
