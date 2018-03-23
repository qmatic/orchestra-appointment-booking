import { IToast } from '../../models/toast.model';
import * as fromToasts from '../actions/toasts.action'

export interface IToastState {
    data: IToast[];
}

export const initialState = {
    data: []
}

function removeToast(state, toast): IToast[] {
    const index = state.data.findIndex(data => data.id === toast.id);
    return [...state.data.slice(0, index), ...state.data.slice(index + 1)];
}

export function reducer ( 
    state = initialState, 
    action: fromToasts.ToastAction
): IToastState {
    switch(action.type) {
        case fromToasts.ADD_TOAST: {
            return {
                ...state,
                data: state.data.concat(action.payload)
            }
        }
        case fromToasts.REMOVE_TOAST: {
            const toastToRemove = action.payload;
            const data = removeToast(state, toastToRemove);
            return {
                ...state,
                data
            }
        }
        case fromToasts.REMOVE_FIRST_TOAST: {
            let newToasts = [...state.data];
            newToasts.splice(0, 1);
            return {
                ...state,
                data: newToasts
            }
        }
    }
    return state;
}

// Sub-level Selectors
export const rGetToasts = (state: IToastState) => state.data;
export const rGetNumberOfToasts = (state: IToastState) => state.data.length;
