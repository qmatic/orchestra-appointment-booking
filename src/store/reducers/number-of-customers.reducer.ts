import { IAppointment } from '../../models/IAppointment';
import * as NumberOfCustomersActions from '../actions';

export interface INumberOfCustomersState {
  numberOfCustomers: number;
  maxNumberOfCustomers: number;
}

export const initialState: INumberOfCustomersState = {
  numberOfCustomers: null,
  maxNumberOfCustomers: 10
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
    default: {
      return state;
    }
  }
}
