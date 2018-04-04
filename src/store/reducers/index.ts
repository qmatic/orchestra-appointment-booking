import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { Store } from '@ngrx/store';

import * as fromBranch from './branch.reducer';
import * as fromSystemInfo from './system-info.reducer';
import * as fromUser from './user.reducer';

export interface IAppState {
  branches: fromBranch.IBranchState;
  systemInfo: fromSystemInfo.ISystemInfoState;
  user: fromUser.IUserState;
}

export const reducers: ActionReducerMap<IAppState> = {
  branches: fromBranch.reducer,
  systemInfo: fromSystemInfo.reducer,
  user: fromUser.reducer
  // here is where you put other reducers, when you have them
};
