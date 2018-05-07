import { IAppointment } from '../../models/IAppointment';
import * as BookingActions from '../actions';

export interface IBookingState {
  bookedAppointment: IAppointment;
  bookingHistory: IAppointment[];
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IBookingState = {
  bookedAppointment: null,
  bookingHistory: [],
  loading: false,
  loaded: false,
  error: null
};

export function reducer (
  state: IBookingState = initialState,
  action: BookingActions.AllBookingActions
): IBookingState {
  switch (action.type) {
    case BookingActions.CONFIRM_APPOINTMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case BookingActions.CONFIRM_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        bookedAppointment: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }

    case BookingActions.CONFIRM_APPOINTMENT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case BookingActions.BOOK_APPOINTMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case BookingActions.BOOK_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        bookedAppointment: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }

    case BookingActions.BOOK_APPOINTMENT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
