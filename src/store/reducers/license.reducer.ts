
import * as LicenseActions from '../actions';

export interface ILicenseState {
    status: boolean;
    loading: boolean;
    loaded: boolean;
    error: Object;
}

const initialState = {
  status: false,
  loading: false,
  loaded: false,
  error:  null
};


export function reducer(state: ILicenseState = initialState, action: LicenseActions.AllLicenseActions): ILicenseState {
  switch (action.type) {
    case LicenseActions.FETCH_LICENSE_INFO: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };
    }
    case LicenseActions.FETCH_LICENSE_INFO_SUCCESS: {
      return {
        ...state,
        status: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case LicenseActions.FETCH_LICENSE_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
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
