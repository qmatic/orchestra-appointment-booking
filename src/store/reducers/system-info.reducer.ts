import { ISystemInfo } from './../../models/ISystemInfo';
import * as SystemInfoActions from '../actions';

export interface ISystemInfoState {
  data: ISystemInfo;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

const initialState = {
  data: {
    productName: '',
    releaseName: '',
    productVersion: '',
    licenseCompanyName: '',
    defaultLanguage: '',
    protocol: '',
    host: '',
    port: '',
    timeConvention: '24',
    dateConvention: 'dddd MMMM DD YYYY'
  },
  loading: false,
  loaded: false,
  error:  null
};


export function reducer(
  state: ISystemInfoState = initialState,
  action: SystemInfoActions.AllSystemInfoActions
): ISystemInfoState {
  switch (action.type) {
    case SystemInfoActions.FETCH_SYSTEM_INFO: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case SystemInfoActions.FETCH_SYSTEM_INFO_SUCCESS: {
      return {
        ...state,
        data: {
            ...state.data,
            ...action.payload
        },
        loading: false,
        loaded: true,
        error: null
      };
    }
    case SystemInfoActions.FETCH_SYSTEM_INFO_FAIL: {
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
