import * as fromSystem from '../actions/system.action'
import { ISystemInformation } from '../../models/system.model';

export interface ISystemState {
    systemInformation: ISystemInformation;
    loading: boolean;
    loaded: boolean;
    error?: any;
}

export const initialState = {
    systemInformation: {},
    loading: false,
    loaded: false,
    error: null
}

export function reducer ( 
    state = initialState, 
    action: fromSystem.SystemAction
): ISystemState {
    switch(action.type) {
        case fromSystem.LOAD_SYSTEM_INFORMATION: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case fromSystem.LOAD_SYSTEM_INFORMATION_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                systemInformation: Object.assign({}, state.systemInformation, action.payload),
                error: null
            }
        }
        case fromSystem.LOAD_SYSTEM_INFORMATION_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
    return state;
}

// Sub-level Selectors
export const rGetSystemInformation = (state: ISystemState) => state.systemInformation;
export const rGetSystemInformationLoading = (state: ISystemState) => state.loading;
export const rGetSystemInformationLoaded = (state: ISystemState) => state.loaded;
