import * as AppointmentMetaActions from '../actions';

export interface IAppointmentMetaState {
  notificationType: string;
  title: string;
  notes: string;
}

export const initialState: IAppointmentMetaState = {
  notificationType: '',
  title: '',
  notes: ''
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
    default: {
        return state;
    }
  }
}
