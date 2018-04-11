import { IUserRoleState, ADMIN_ROLE } from './../../reducers/user-role.reducer';
import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';

// selectors
const getUserRoleState = createFeatureSelector<IUserRoleState>('userRole');

const getUserRole = createSelector(
  getUserRoleState,
  (state: IUserRoleState) => state.role
);

const isUserAdmin = createSelector(
  getUserRoleState,
  (state: IUserRoleState) => state.role === ADMIN_ROLE
);

@Injectable()
export class UserRoleSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  userRole$ = this.store.select(getUserRole);
  isUserAdmin$ = this.store.select(isUserAdmin);
}
