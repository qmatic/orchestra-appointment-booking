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
    case BookingActions.ADD_TO_BOOKING_HISTORY: {
      return {
        ...state,
        bookingHistory: updateBookingHistory(state, action)
      };
    }
    default: {
      return state;
    }
  }
}

function updateBookingHistory(
  state: IBookingState,
  action: BookingActions.AddToBookingHistory
): IAppointment[] {
  if (state.bookingHistory.length >= 1) {
    const isAlreadyInHistory = bookingHistoryContainsAppointmentAtIndex(state.bookingHistory, action.payload.appointment);

    if (isAlreadyInHistory.found === true) {
      return replaceInBookingHistory(state.bookingHistory, action, isAlreadyInHistory.index);
    } else {
      return [
        {
          ...action.payload.appointment,
          deleted: action.payload.deleted
        },
        {
          ...state.bookingHistory[0]
        }
      ];
    }
  } else {
    return [
      {
        ...action.payload.appointment,
        deleted: action.payload.deleted
      }
    ];
  }
}

function bookingHistoryContainsAppointmentAtIndex(
  bookingHistory: IAppointment[],
  appointment: IAppointment
): { found: boolean, index: number } {
  return bookingHistory.reduce(
    (acc, curr, currIndex) => {
      return !acc.found ? (curr.publicId === appointment.publicId ? { found: true, index: currIndex } : acc) : acc;
    },
    { found: false, index: -1 }
  );
}

function replaceInBookingHistory(
  bookingHistory: IAppointment[],
  action: BookingActions.AddToBookingHistory,
  index: number
): IAppointment[] {
  return bookingHistory.map((appointment, i) => {
    return i === index ? {...action.payload.appointment, deleted: action.payload.deleted} : appointment;
  });
}
