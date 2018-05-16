import {
  HIDE_RESERVATION_EXPIRY_TIMER,
  SHOW_RESERVATION_EXPIRY_TIMER
} from './../actions/reservation-expiry-timer.actions';
import * as Actions from '../actions';

export interface IReservationTimerState {
  onGoingTime: number;
  showTimer: Boolean;
}

const initialState = {
  onGoingTime: 0,
  showTimer: false
};

export function reducer(
  state: IReservationTimerState = initialState,
  action: Actions.AllReservationTimerActions
): IReservationTimerState {
  switch (action.type) {
    case Actions.SET_RESERVATION_EXPIRY_TIME: {
      return {
        ...state,
        onGoingTime: action.payload
      };
    }
    case Actions.HIDE_RESERVATION_EXPIRY_TIMER: {
      return {
        ...state,
        showTimer: false
      };
    }
    case Actions.SHOW_RESERVATION_EXPIRY_TIMER: {
      return {
        ...state,
        showTimer: true
      };
    }
    default: {
      return state;
    }
  }
}
