import { IAppointment } from '../../models/IAppointment';
import * as BookingActions from '../actions';

export interface IBookingState {
  appointment: IAppointment;
  loading: boolean;
  error: Object;
}

export const initialState: IBookingState = {
  appointment: {
    publicId: null,
    status: null,
    created: null,
    updated: null,
    start: null,
    custom: null,
    customers: null,
    branch: null,
    services: null,
    title: '',
    notes: '',
    allDay: null,
    blocking: null,
    end: null
  },
  loading: false,
  error: null
};

export function reducer (
  state: IBookingState = initialState,
  action: BookingActions.AllBookingActions
): IBookingState {
  switch (action.type) {
    case BookingActions.SET_BOOKING_NOTE: {
      return {
        ...state,
        appointment: {
          ...state.appointment,
          notes: action.payload
        }
      };
    }
    default: {
        return state;
    }
  }
}
