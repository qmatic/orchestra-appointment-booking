import { IAccountState } from './../../reducers/account.reducer';
import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IUserRoleState, ADMIN_ROLE } from './../../reducers/user-role.reducer';

// selectors
const getUserRoleState = createFeatureSelector<IAccountState>('account');

const getUserRole = createSelector(
  getUserRoleState,
  (state: IAccountState) => state.userRole
);

const isUserAdmin = createSelector(
  getUserRole,
  (state: string) => state === ADMIN_ROLE
);

@Injectable()
export class UserRoleSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  userRole$ = this.store.select(getUserRole);
  isUserAdmin$ = this.store.select(isUserAdmin);
}
