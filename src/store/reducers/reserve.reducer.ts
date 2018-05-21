import { IAppointment } from '../../models/IAppointment';
import * as ReserveActions from '../actions';

export interface IReserveState {
  reservedAppointment: IAppointment;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IReserveState = {
  reservedAppointment: null,
  loading: false,
  loaded: false,
  error: null
};

export function reducer(
  state: IReserveState = initialState,
  action: ReserveActions.AllReserveActions
): IReserveState {
  switch (action.type) {
    case ReserveActions.RESERVE_APPOINTMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ReserveActions.RESERVE_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        reservedAppointment: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case ReserveActions.RESERVE_APPOINTMENT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case ReserveActions.UNRESERVE_APPOINTMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ReserveActions.UNRESERVE_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        reservedAppointment: null,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case ReserveActions.UNRESERVE_APPOINTMENT_FAIL: {
      return {
        ...state,
        reservedAppointment: null,
        loading: false,
        error: action.payload
      };
    }
    case ReserveActions.RESET_RESERVED_APPOINTMENT: {
      return {
        ...state,
        reservedAppointment: null
      };
    }
    default: {
      return state;
    }
  }
}
