import * as AppointmentMetaActions from '../actions';

export interface IAppointmentMetaState {
  notificationType: string;
  title: string;
  notes: string;
  printAppointmentOption: boolean;
}

export const initialState: IAppointmentMetaState = {
  notificationType: '',
  title: '',
  notes: '',
  printAppointmentOption: false
};

export function reducer (
  state: IAppointmentMetaState = initialState,
  action: AppointmentMetaActions.AllAppointmentMetaActions
): IAppointmentMetaState {
  switch (action.type) {
    case AppointmentMetaActions.SET_APPOINTMENT_NOTIFICATION_TYPE: {
      return {
        ...state,
        notificationType: action.payload
      };
    }
    case AppointmentMetaActions.SET_APPOINTMENT_TITLE: {
      return {
        ...state,
        title: action.payload
      };
    }
    case AppointmentMetaActions.SET_APPOINTMENT_NOTE: {
      return {
        ...state,
        notes: action.payload
      };
    }
    case AppointmentMetaActions.RESET_APPOINTMENT_NOTIFICATION_TYPE: {
      return {
        ...state,
        notificationType: ''
      };
    }
    case AppointmentMetaActions.RESET_APPOINTMENT_TITLE: {
      return {
        ...state,
        title: ''
      };
    }
    case AppointmentMetaActions.RESET_APPOINTMENT_NOTE: {
      return {
        ...state,
        notes: ''
      };
    }
    case AppointmentMetaActions.PRINT_APPOINTMENT_OPTION: {
      return {
        ...state,
       printAppointmentOption: action.payload
      };
    }
    default: {
        return state;
    }
  }
}
