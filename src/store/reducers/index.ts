import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store'

import * as fromToasts from './toasts.reducer';
import * as fromSystem from './system.reducer';

export interface IAppState {
    system: fromSystem.ISystemState;
    toasts: fromToasts.IToastState;
};

export const reducers: ActionReducerMap<IAppState> = {
    system: fromSystem.reducer,
    toasts: fromToasts.reducer
};

// Root level selectors
export const getSystemState = createFeatureSelector<fromSystem.ISystemState>('system');
export const getSystemInformation = createSelector(getSystemState, fromSystem.rGetSystemInformation);
export const getSystemInformationLoading = createSelector(getSystemState, fromSystem.rGetSystemInformationLoading);
export const getSystemInformationLoaded = createSelector(getSystemState, fromSystem.rGetSystemInformationLoaded);

export const getToastsState = createFeatureSelector<fromToasts.IToastState>('toasts');
export const getAllToasts = createSelector(getToastsState, fromToasts.rGetToasts);
export const getNumberOfTotalToasts = createSelector(getToastsState, fromToasts.rGetNumberOfToasts);


