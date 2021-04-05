import { IAppointment } from '../../models/IAppointment';
import * as AppointmentActions from '../actions';

export interface IAppointmentState {
  appointments: IAppointment[];
  selectedAppointment: IAppointment;
  qpAppointment: IAppointment;
  loading: boolean;
  loaded: boolean;
  error: Object;
  emailTemplete: string;
  resentAppoinmentId: string;
}

export const initialState: IAppointmentState = {
  appointments: [],
  selectedAppointment: null,
  qpAppointment: null,
  loading: false,
  loaded: false,
  error: null,
  emailTemplete: "",
  resentAppoinmentId:''
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
    case AppointmentActions.FETCH_ACTION_APPOINTMENTS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_ACTION_APPOINTMENTS_SUCCESS: {
      return {
        ...state,
        appointments: action.payload.appointmentActions,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_ACTION_APPOINTMENTS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentActions.FETCH_APPOINTMENT_QP: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_APPOINTMENT_QP_SUCCESS: {
      return {
        ...state,
        qpAppointment: (action.payload as any).appointment,
        loading: false,
        // loaded: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_APPOINTMENT_QP_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentActions.SET_APPOINTMENT_STAT_EVENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentActions.SET_APPOINTMENT_STAT_EVENT_SUCCESS: {
      var tmpAppointment = state.qpAppointment;
      var newtmpAppointment = { ...tmpAppointment , invokeStatEvent:true} ;
      return {
        ...state,
        qpAppointment: newtmpAppointment,
        loading: false,
        // loaded: true,
        error: null
      };
    }
    case AppointmentActions.SET_APPOINTMENT_STAT_EVENT_FAIL: {
      var tmpAppointment = state.qpAppointment;
      var newtmpAppointment = { ...tmpAppointment , invokeStatEvent:true} ;
      return {
        ...state,
        qpAppointment: newtmpAppointment,
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
    case AppointmentActions.FETCH_APPOINTMENT_EMAIL_TEMPLETE: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_APPOINTMENT_EMAIL_TEMPLETE_SUCCESS: {
      return {
        ...state,
        emailTemplete:action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case AppointmentActions.FETCH_APPOINTMENT_EMAIL_TEMPLETE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentActions.RESEND_APPOINTMENT_COMFIRMATION: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentActions.RESEND_APPOINTMENT_COMFIRMATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null
      };
    }
    case AppointmentActions.RESEND_APPOINTMENT_COMFIRMATION_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentActions.SET_RESEND_APPOINTMENT: {
      return {
        ...state,
        resentAppoinmentId: action.payload
      };
    }
    case AppointmentActions.RESET_APPOINTMENT_LOADED: {
      return {
        ...state,
        loaded: false
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

function parseJson(
  appointmentList: IAppointment[]
): IAppointment[] {
  var newAppointmentList = [];
  // var newAppointmentList = {...appointmentList, change:JSON.parse(appointmentList.change)}
  console.log(appointmentList);
  
  appointmentList.forEach((appointment: IAppointment) => {
    // newAppointmentList.push({...appointment, change: JSON.parse(appointment.change.toString())});
    console.log(appointment.change);
  });
  return newAppointmentList;
}
