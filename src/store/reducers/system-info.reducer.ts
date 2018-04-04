import { ISystemInfo } from './../../models/ISystemInfo';
import * as systemInfoActions from './../actions/system-info.actions';
import { IUser } from './../../models/IUser';

export interface ISystemInfoState {
    data: ISystemInfo,
    loaded: boolean,
    error: Object
}

const initialState = {
  data: {
        productName: "",
        releaseName: "",
        productVersion: "",
        licenseCompanyName: "",
        defaultLanguage: "",
        protocol: "",
        host: "",
        port: ""
    },
    loaded: false,
    error:  null
}


export function SystemInfoReducer(state:ISystemInfoState = initialState, action: systemInfoActions.SystemInfoAction) {
  switch (action.type) {
    case systemInfoActions.FETCH_SYSTEM_INFO_SUCCESS:
        return { 
            ...state,
            data: {
                ...action.payload
            },
            loaded: true,
            error: null
        };
    case systemInfoActions.FETCH_SYSTEM_INFO_FAIL:
        return { 
            ...state,
            data: {
                ...state.data
            },
            loaded: true,
            error: {
                ...action.payload
            }
        };
    default:
        return state;
    }
}