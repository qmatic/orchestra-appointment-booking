import { IAppointment } from '../../models/IAppointment';
import * as AppointmentActions from '../actions';

export interface IAppointmentState {
  appointments: IAppointment[];
  selectedAppointment: IAppointment;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IAppointmentState = {
  appointments: [],
  selectedAppointment: null,
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
    case AppointmentActions.DELETE_APPOINTMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentActions.DELETE_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        appointments: removeAppointment(state, action.payload),
        loading: false,
        error: null
      };
    }
    case AppointmentActions.DELETE_APPOINTMENT_FAIL: {
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
    case AppointmentActions.SELECT_APPOINTMENT: {
      return {
        ...state,
        selectedAppointment: action.payload
      };
    }
    case AppointmentActions.RESET_APPOINTMENT: {
      return {
        ...state,
        selectedAppointment: null
      };
    }
    default: {
        return state;
    }
  }
}

function removeAppointment(
  state: IAppointmentState,
  appointmentToRemove: IAppointment
) {
  return state.appointments.filter(
    (appointment: IAppointment) =>
      appointment.publicId !== appointmentToRemove.publicId
  );
}
