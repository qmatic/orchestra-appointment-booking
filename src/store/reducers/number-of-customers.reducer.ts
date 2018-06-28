import { IAppointment } from '../../models/IAppointment';
import * as NumberOfCustomersActions from '../actions';

export interface INumberOfCustomersState {
  numberOfCustomers: number;
}

export const initialState: INumberOfCustomersState = {
  numberOfCustomers: null,
};

export function reducer (
  state: INumberOfCustomersState = initialState,
  action: NumberOfCustomersActions.AllNumberOfCustomersActions
): INumberOfCustomersState {
  switch (action.type) {
    case NumberOfCustomersActions.SET_NUMBER_OF_CUSTOMERS: {
      return {
        ...state,
        numberOfCustomers: action.payload
      };
    }
    case NumberOfCustomersActions.RESET_NUMBER_OF_CUSTOMERS: {
      return {
        ...state,
        numberOfCustomers: null
      };
    }
    case NumberOfCustomersActions.LOAD_SELECTED_NUMBER_OF_CUSTOMERS: {
      return {
        ...state,
        numberOfCustomers: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
