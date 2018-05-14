import { ICalendarSetting } from './../../models/ICalendarSetting';
import * as Actions from '../actions';

export interface ICalendarSettingsState {
  data: ICalendarSetting;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

const initialState = {
  data: {
    reservationExpiryTimeSeconds: null
  },
  loading: false,
  loaded: false,
  error: null
};

export function reducer(
  state: ICalendarSettingsState = initialState,
  action: Actions.AllCalendarSettingsActions
): ICalendarSettingsState {
  switch (action.type) {
    case Actions.FETCH_CALENDAR_SETTINGS_INFO: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case Actions.FETCH_CALENDAR_SETTINGS_SUCCESS: {
      return {
        ...state,
        data: {
          ...action.payload.data
        },
        loading: false,
        loaded: true,
        error: null
      };
    }
    case Actions.FETCH_CALENDAR_SETTINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          ...action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
