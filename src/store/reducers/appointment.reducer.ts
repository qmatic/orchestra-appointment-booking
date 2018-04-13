import { IAppointment } from '../../models/IAppointment';
import * as AppointmentActions from '../actions';

export interface IAppointmentState {
  appointments: IAppointment[];
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IAppointmentState = {
  appointments: [],
  loading: false,
  loaded: false,
  error: null
};

export function reducer (
  state: IAppointmentState = initialState,
  action: AppointmentActions.AllAppointmentActions
): IAppointmentState {
  switch (action.type) {
    case AppointmentActions.FETCH_APPOINTMENTS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_APPOINTMENTS_SUCCESS: {
      return {
        ...state,
        appointments: action.payload.appointmentList,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_APPOINTMENTS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentActions.RESET_APPOINTMENTS: {
      return {
        ...state,
        appointments: [],
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
