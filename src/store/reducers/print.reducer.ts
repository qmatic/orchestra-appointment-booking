import { IAppointment } from '../../models/IAppointment';
import * as PrintActions from '../actions';

export interface IPrintState {
  printedAppointment: IAppointment;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IPrintState = {
  printedAppointment: null,
  loading: false,
  loaded: false,
  error: null
};

export function reducer(
  state: IPrintState = initialState,
  action: PrintActions.AllPrintActions
): IPrintState {
  switch (action.type) {
    case PrintActions.PRINT_APPOINTMENT: {
      return {
        ...state,
        printedAppointment: action.payload,
        loading: true,
        error: null
      };
    }
    default: {
      return state;
    }
  }
}
