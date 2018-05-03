import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IUserState } from '../../reducers/user.reducer';
import { IUser } from '../../../models/IUser';

// selectors
const getUserState = createFeatureSelector<IUserState>('user');

const getUser = createSelector(
  getUserState,
  (state: IUserState) => state.data
);

const getUserFullName = createSelector(
  getUser,
  (state: IUser) => state.fullName
);

const getUserUserName = createSelector(
  getUser,
  (state: IUser) => state.userName
);

export const getUserLocale = createSelector(
  getUser,
  (state: IUser) => state.locale
);

const getUserDirection = createSelector(
  getUser,
  (state: IUser) => state.direction
);

const getUserIsAdmin = createSelector(
  getUser,
  (state: IUser) => state.isAdmin
);

@Injectable()
export class UserSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  user$ = this.store.select(getUser);
  userFullName$ = this.store.select(getUserFullName);
  userUserName$ = this.store.select(getUserUserName);
  userLocale$ = this.store.select(getUserLocale);
  userDirection$ = this.store.select(getUserDirection);
  userIsAdmin$ = this.store.select(getUserIsAdmin);
}
