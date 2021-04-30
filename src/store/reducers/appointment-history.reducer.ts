import { IAppointmentVisit } from '../../models/IAppointmentVisit';
import { IAppointment } from '../../models/IAppointment';
import * as AppointmentHistoryActions from '../actions';

export interface IAppointmentHistoryState {
  loading: boolean;
  appointments: IAppointment[];
  appointment: IAppointment;
  loaded: boolean;
  error: Object;
  appointmentVisit: IAppointmentVisit[];
}

export const initialState: IAppointmentHistoryState = {
  appointments: [],
  appointment: null,
  loading: false,
  loaded: false,
  error: null,
  appointmentVisit: []
};

export function reducer (
  state: IAppointmentHistoryState = initialState,
  action: AppointmentHistoryActions.AllAppointmentHistoryActions
): IAppointmentHistoryState {
  switch (action.type) {
    case AppointmentHistoryActions.FETCH_ACTION_APPOINTMENTS: {
        return {
          ...state,
          loading: true,
          error: null
        };
      }
      case AppointmentHistoryActions.FETCH_ACTION_APPOINTMENTS_SUCCESS: {
        return {
          ...state,
          appointments: action.payload.appointmentActions,
          loading: false,
          loaded: true,
          error: null
        };
      }
      case AppointmentHistoryActions.FETCH_ACTION_APPOINTMENTS_FAIL: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
    case AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        appointment: (action.payload as any).appointment,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentHistoryActions.FETCH_VISIT_DATA: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_VISIT_DATA_SUCCESS: {
      return {
        ...state,
        appointmentVisit: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_VISIT_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentHistoryActions.RESET_ACTION_APPOINTMENTS: {
      return {
        ...state,
        appointments: [],
        appointment: null,
        appointmentVisit: [],
        error: null
      };
    }
    case AppointmentHistoryActions.RESET_APPOINTMENT_VISIT: {
      return {
        ...state,
        appointment: null,
        appointmentVisit: [],
        error: null
      };
    }
    
}
}
